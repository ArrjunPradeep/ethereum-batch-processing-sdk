import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class HttpRestApiSendTokenBody {

    @ApiProperty({type: 'string'})
    public privateKey: string;

    @ApiProperty({type: 'string'})
    public tokenAddress: string;

    @ApiProperty({type: [String]})
    public receiverAddress: string[];

    @ApiProperty({type: [String]})
    public amount: string[];

    @ApiPropertyOptional({type: 'string'})
    public gasLimit: string;

    @ApiPropertyOptional({type: 'string'})
    public maxFeePerGas: string;
    
    @ApiPropertyOptional({type: 'string'})
    public maxPriorityFeePerGas: string;

}