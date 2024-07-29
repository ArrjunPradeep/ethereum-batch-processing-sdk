import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Contract, ethers, EtherscanProvider } from "ethers";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";

export class EthereumTransactionService {

    private provider: ethers.JsonRpcProvider;
    private wallet: ethers.Wallet;
    private etherScan: ethers.EtherscanProvider;
    private chainId: string;

    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService
    ) {
        const providerUrl: string = this.configService.getOrThrow<string>('NODE_URL');
        const privateKey: string = this.configService.getOrThrow<string>('PRIVATE_KEY');
        const explorerApiKey: string = this.configService.getOrThrow<string>('EXPLORER_API_KEY');
        const chainId: string = this.configService.getOrThrow<string>('CHAIN_ID');

        this.provider = new ethers.JsonRpcProvider(providerUrl);
        this.wallet = new ethers.Wallet(privateKey, this.provider);
        this.etherScan = new ethers.EtherscanProvider(chainId, explorerApiKey);

    }

    // public async sendCoin(transaction: Transaction): Promise<ethers.TransactionResponse> {
        
    //     const contractInfo = await this.etherScan.getContract(transaction.tokenAddress);        
        
    //     const contractABI: readonly ethers.Fragment[] = contractInfo?.interface.fragments;

    //     const tokenContract = new ethers.Contract(transaction.tokenAddress, contractABI ,this.wallet);


    // }

    

}