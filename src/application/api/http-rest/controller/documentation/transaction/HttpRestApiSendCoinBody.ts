import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class HttpRestApiSendCoinBody {

    @ApiProperty({
        type: 'string',
        description: "Account private key",
        default: "0xACCOUNT_PRIVATE_KEY"
    })
    public privateKey: string;

    @ApiProperty({
        type: [String],
        description: "Array of receiver addresses",
        default: ["0xADDR1", "0xADDR2"],
    })
    public receiverAddress: string[];

    @ApiProperty({
        type: [String],
        description: "Array of amounts (without decimals)",
        default:  ["AMOUNT1", "AMOUNT2"]
    })
    public amount: string[];

    @ApiPropertyOptional({
        type: 'string',
        description: "Gas Limit (gwei)",
        default: "0xLIMIT"
    })
    public gasLimit: string;

    @ApiPropertyOptional({
        type: 'string',
        description: 'maxFeePerGas (gwei)',
        default: "0xBASEFEE"
    })
    public maxFeePerGas: string;
    
    @ApiPropertyOptional({
        type: 'string',
        description: 'maxPriorityFeePerGas (gwei)',
        default: "0xPRIORITYFEE"
    })
    public maxPriorityFeePerGas: string;

}