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
        description: 'maxBaseFee (gwei)',
        default: "0xBASEFEE"
    })
    public maxBaseFee: string;
    
    @ApiPropertyOptional({
        type: 'string',
        description: 'priorityFee (gwei)',
        default: "0xPRIORITYFEE"
    })
    public priorityFee: string;

}