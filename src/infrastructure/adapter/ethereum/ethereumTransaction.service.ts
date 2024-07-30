import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Contract, ethers, EtherscanProvider, recoverAddress, TransactionResponse } from "ethers";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";

export class EthereumTransactionService {

    private provider: ethers.JsonRpcProvider;
    private wallet: ethers.Wallet;
    private etherScan: ethers.EtherscanProvider;
    private chainId: string;
    private batchContract: string;


    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService
    ) {
        const providerUrl: string = this.configService.getOrThrow<string>('NODE_URL');
        const privateKey: string = this.configService.getOrThrow<string>('PRIVATE_KEY');
        const explorerApiKey: string = this.configService.getOrThrow<string>('EXPLORER_API_KEY');
        const chainId: string = this.configService.getOrThrow<string>('CHAIN_ID');
        const batchContractAddress: string = this.configService.getOrThrow<string>('BATCH_CONTRACT');

        this.provider = new ethers.JsonRpcProvider(providerUrl);
        // this.wallet = new ethers.Wallet(privateKey, this.provider);
        this.etherScan = new ethers.EtherscanProvider(chainId, explorerApiKey);
        this.batchContract = batchContractAddress
    }

    public async sendCoin(transaction: Transaction): Promise<ethers.TransactionResponse> {
        console.log("🚀 ~ EthereumTransactionService ~ sendCoin ~ transactio̥n:", transaction)

        this.wallet = new ethers.Wallet(transaction.privateKey, this.provider);

        const batchContractInfo = await this.etherScan.getContract(this.batchContract);        
        const batchContractABI: readonly ethers.Fragment[] = batchContractInfo?.interface.fragments;
        const batchContract = new ethers.Contract(this.batchContract, batchContractABI ,this.wallet);
        const tokenAddress = transaction.tokenAddress === undefined ? ethers.ZeroAddress : ethers.ZeroAddress;

        let tx;

        const receiver = transaction.receiverAddress;

        const formattedAmounts = transaction.amount.map(a => ethers.parseEther(a.toString()));
        const totalAmountInEther = transaction.amount.reduce((acc, current) => acc + Number(current), 0);

        tx = await batchContract.batchTransfer(receiver, formattedAmounts, tokenAddress, {
            value: ethers.parseEther(String(totalAmountInEther))
        });
        console.log(`Token transfer to ${receiver} hash:`, tx.hash);
        await tx.wait();
        console.log(`Token transfer to ${receiver} confirmed!`);

        return tx;

    }

    public async sendToken(transaction: Transaction): Promise<ethers.TransactionResponse> {

        this.wallet = new ethers.Wallet(transaction.privateKey, this.provider);

        const batchContractInfo = await this.etherScan.getContract(this.batchContract);        
        const batchContractABI: readonly ethers.Fragment[] = batchContractInfo?.interface.fragments;
        const batchContract = new ethers.Contract(this.batchContract, batchContractABI ,this.wallet);

        const tokenAddress = transaction.tokenAddress;
        const tokenContractInfo = await this.etherScan.getContract(tokenAddress);
        const tokenContractABI: readonly ethers.Fragment[] = tokenContractInfo?.interface.fragments;
        const tokenContract = new ethers.Contract(tokenAddress, tokenContractABI, this.wallet);

        let tx;

        const receiver: string[] = transaction.receiverAddress;
        const amount: string[] = transaction.amount;
        const tokenDecimals: number = await tokenContractInfo.decimals();
        
        const formattedAmounts = transaction.amount.map(a => ethers.parseUnits(a.toString(), tokenDecimals));
        const totalAmountInUnits = transaction.amount.reduce((acc, current) => acc + Number(current), 0);
            
        const approveTx = await tokenContract.approve(this.batchContract, ethers.parseUnits(String(totalAmountInUnits), tokenDecimals));
        console.log(`Approve transaction hash: ${approveTx.hash}`);
        await approveTx.wait();
        console.log('Approval confirmed.');

        tx = await batchContract.batchTransfer(receiver, formattedAmounts, tokenAddress);
        console.log(`Token transfer to ${receiver} hash:`, tx.hash);
        await tx.wait();
        console.log(`Token transfer to ${receiver} confirmed!`);

        return tx;

    }
    

}