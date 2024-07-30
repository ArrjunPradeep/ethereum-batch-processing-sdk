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
        this.wallet = new ethers.Wallet(privateKey, this.provider);
        this.etherScan = new ethers.EtherscanProvider(chainId, explorerApiKey);
        this.batchContract = batchContractAddress
    }

    public async sendCoin(transaction: Transaction): Promise<ethers.TransactionResponse> {
        
        const contractInfo = await this.etherScan.getContract(this.batchContract);        
        console.log("!@4643733625312", contractInfo);
        
        const contractABI: readonly ethers.Fragment[] = contractInfo?.interface.fragments;
        console.log("!@4643733625312132", contractABI);

        const tokenC̥ontract = new ethers.Contract(this.batchContract, contractABI ,this.wallet);
        console.log("🚀 ~ EthereumTransactionService ~ sendCoin ~ tokenC̥ontract:", tokenC̥ontract)

        let tx;

        for (let i = 0; i < transaction.receiverAddress.length; i++) {

            console.log("@146546456457659340683246138746174e12");
            
            const receiver = transaction.receiverAddress[i];
            const amount = transaction.amount[i];
            
            tx = await tokenC̥ontract.batchTransfer([receiver], [amount], "0xE69dbc3CA1a2e23EB0db04b59dd490DCF55e5e97", {});
            console.log(`Token transfer to ${receiver} hash:`, tx.hash);
            await tx.wait();
            console.log(`Token transfer to ${receiver} confirmed!`);
        }

        return tx;

        // const txnResponse = await tokenC̥ontract.batchTransfer(
        //     transaction.receiverAddress,
        //     transaction.amount,
        //     transaction.tokenAddress, {
        //         value: ethers.parseEther('0.0001')
        //     }
        // );

        // console.log("12523452353", txnResponse);
        

        // return txnResponse;

    }

    

}