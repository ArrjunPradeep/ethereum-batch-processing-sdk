import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosResponse } from "axios";
import { Contract, ethers, EtherscanProvider, recoverAddress, TransactionResponse } from "ethers";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";

export class EthereumTransactionService {

    private provider: ethers.JsonRpcProvider;
    private wallet: ethers.Wallet;
    private etherScan: ethers.EtherscanProvider;
    private chainId: string;
    private batchContract: string;
    private etherScanApiKey: string;

    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService
    ) {
        // Initialize provider, wallet, and other settings using the configuration service
        const providerUrl: string = this.configService.getOrThrow<string>('NODE_URL');
        const privateKey: string = this.configService.getOrThrow<string>('PRIVATE_KEY');
        const explorerApiKey: string = this.configService.getOrThrow<string>('EXPLORER_API_KEY');
        const chainId: string = this.configService.getOrThrow<string>('CHAIN_ID');
        const batchContractAddress: string = this.configService.getOrThrow<string>('BATCH_CONTRACT');

        // Create a new JSON-RPC provider instance
        this.provider = new ethers.JsonRpcProvider(providerUrl);
        // this.wallet = new ethers.Wallet(privateKey, this.provider);

        // Initialize Etherscan provider for contract interactions
        this.etherScan = new ethers.EtherscanProvider(chainId, explorerApiKey);
        this.batchContract = batchContractAddress;
        this.etherScanApiKey = explorerApiKey
    }

    /**
     * Sends an Ether transaction to a specified receiver.
     * 
     * @param transaction - The transaction details including receiver address, amounts, and optional gas settings.
     * @returns A promise that resolves to the transaction response.
     */
    public async sendCoin(transaction: Transaction): Promise<ethers.TransactionResponse> {
        console.log(" SEND COIN TRANSACTION \n", transaction)

        // Reinitialize wallet for each transaction with the provided private key
        this.wallet = new ethers.Wallet(transaction.privateKey, this.provider);

        // Fetch the batch contract ABI and create an instance of the contract
        const batchContractInfo = await this.etherScan.getContract(this.batchContract);
        const batchContractABI: readonly ethers.Fragment[] = batchContractInfo?.interface.fragments;
        const batchContract = new ethers.Contract(this.batchContract, batchContractABI, this.wallet);
        
        // Use default token address if not provided
        const tokenAddress = transaction.tokenAddress === undefined ? ethers.ZeroAddress : ethers.ZeroAddress;

        let tx;

        const receiver = transaction.receiverAddress;
        // const maxFeePerGas = transaction.maxFeePerGas === '' ? ethers.parseUnits(transaction.maxFeePerGas, 'gwei').toString()
        // const maxPriorityFeePerGas = ethers.parseUnits(transaction.maxPriorityFeePerGas, 'gwei').toString();

        // Format the amounts and calculate the total amount in Ether
        const formattedAmounts = transaction.amount.map(a => ethers.parseEther(a.toString()));
        const totalAmountInEther = transaction.amount.reduce((acc, current) => acc + Number(current), 0);

        type TxObject = {
            value: bigint;
            maxPriorityFeePerGas?: string;
            maxFeePerGas?: string;
            gasLimit?: string;
        };

        // Prepare transaction options with optional gas settings
        let options: TxObject = {
            value: ethers.parseEther(String(totalAmountInEther))
        }

        if(transaction.gasLimit !== '') {
            options.gasLimit = transaction.gasLimit
        }

        // Conditionally add maxPriorityFeePerGas if it's not an empty string
        if (transaction.maxPriorityFeePerGas !== '') {
            options.maxPriorityFeePerGas = ethers.parseUnits(transaction.maxPriorityFeePerGas, 'gwei').toString();
        }

        // Conditionally add maxFeePerGas if it's not an empty string
        if (transaction.maxFeePerGas !== '') {
            options.maxFeePerGas = ethers.parseUnits(transaction.maxFeePerGas, 'gwei').toString();
        }

        console.log("options-send-coin", options);
        
        // Execute the batch transfer transaction
        tx = await batchContract.batchTransfer(receiver, formattedAmounts, tokenAddress, options);
        console.log(`Token transfer to ${receiver} hash:`, tx.hash);
        await tx.wait();
        console.log(`Token transfer to ${receiver} confirmed!`);

        // Format gas fees to gwei for readability
        tx.maxFeePerGas = ethers.formatUnits(tx.maxFeePerGas, 'gwei');
        tx.maxPriorityFeePerGas = ethers.formatUnits(tx.maxPriorityFeePerGas, 'gwei');        

        return tx;

    }

    /**
     * Sends a token transaction with approval step before the transfer.
     * 
     * @param transaction - The transaction details including receiver addresses, token address, and amounts.
     * @returns A promise that resolves to the transaction response.
     */
    public async sendToken(transaction: Transaction): Promise<ethers.TransactionResponse> {
        // Reinitialize wallet for each transaction with the provided private key
        this.wallet = new ethers.Wallet(transaction.privateKey, this.provider);

        // Fetch the batch contract ABI and create an instance of the contract
        const batchContractInfo = await this.etherScan.getContract(this.batchContract);
        const batchContractABI: readonly ethers.Fragment[] = batchContractInfo?.interface.fragments;
        const batchContract = new ethers.Contract(this.batchContract, batchContractABI, this.wallet);

        // Fetch the token contract ABI and create an instance of the token contract
        const tokenAddress = transaction.tokenAddress;
        const tokenContractInfo = await this.etherScan.getContract(tokenAddress);
        const tokenContractABI: readonly ethers.Fragment[] = tokenContractInfo?.interface.fragments;
        const tokenContract = new ethers.Contract(tokenAddress, tokenContractABI, this.wallet);

        let tx;

        // Prepare transaction options
        const receiver: string[] = transaction.receiverAddress;
        const amount: string[] = transaction.amount;
        const tokenDecimals: number = await tokenContractInfo.decimals();

        const formattedAmounts = transaction.amount.map(a => ethers.parseUnits(a.toString(), tokenDecimals));
        const totalAmountInUnits = transaction.amount.reduce((acc, current) => acc + Number(current), 0);

        type TxObject = {
            maxPriorityFeePerGas?: string;
            maxFeePerGas?: string;
            gasLimit?: string;
        };

        // Prepare transaction options with optional gas settings
        let options: TxObject = {}

        if(transaction.gasLimit !== '') {
            options.gasLimit = transaction.gasLimit;
        }

        if (transaction.maxPriorityFeePerGas !== '') {
            options.maxPriorityFeePerGas = ethers.parseUnits(transaction.maxPriorityFeePerGas, 'gwei').toString();
        }

        if (transaction.maxFeePerGas !== '') {
            options.maxFeePerGas = ethers.parseUnits(transaction.maxFeePerGas, 'gwei').toString();
        }

        console.log("options-send-token", options);

        // Approve the batch contract to spend the specified amount of tokens
        const approveTx = await tokenContract.approve(this.batchContract, ethers.parseUnits(String(totalAmountInUnits), tokenDecimals));
        console.log(`Approve transaction hash: ${approveTx.hash}`);
        await approveTx.wait();
        console.log('Approval confirmed.');

        // Execute the batch transfer transaction
        tx = await batchContract.batchTransfer(receiver, formattedAmounts, tokenAddress, options);
        console.log(`Token transfer to ${receiver} hash:`, tx.hash);
        await tx.wait();
        console.log(`Token transfer to ${receiver} confirmed!`);

        // Format gas fees to gwei for readability
        tx.maxFeePerGas = ethers.formatUnits(tx.maxFeePerGas, 'gwei');
        tx.maxPriorityFeePerGas = ethers.formatUnits(tx.maxPriorityFeePerGas, 'gwei');        

        return tx;

    }

    /**
     * Estimates gas prices using the Etherscan API.
     * 
     * @returns A promise that resolves to an object containing various gas price estimates.
     */
    public async gasEstimator(): Promise<any> {

        type gasEstimatorRequest = {
            module: string,
            action: string,
            apikey: string
        }

        type gasEstimatorData = {
            lowMaxFeePerGas: string,
            marketMaxFeePerGas: string,
            aggressiveMaxFeePerGas: string,
            baseFee: string
        }

        // Define the API request parameters
        const url: string = 'https://api.etherscan.io/api';
        const params: gasEstimatorRequest = {
            module: 'gastracker',
            action: 'gasoracle',
            apikey: this.etherScanApiKey
        };

        try {
            // Make a GET request to the Etherscan API
            const response: AxiosResponse<any, any> = await axios.get(url, { params });

            // Extract gas price data from the API response
            const gasResult = response.data.result;

            const gasData: gasEstimatorData = {
                lowMaxFeePerGas: gasResult.SafeGasPrice,
                marketMaxFeePerGas: gasResult.ProposeGasPrice,
                aggressiveMaxFeePerGas: gasResult.FastGasPrice,
                baseFee: gasResult.suggestBaseFee
            }

            console.log("Gas Price Data:", gasData);
            return gasData
        } catch (error) {
            console.error("Error fetching gas price data:", error);
            throw error;// Re-throw the error for handling upstream
        }

    }
}