import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsNotEmpty, Matches, ArrayNotEmpty } from 'class-validator';

export class HttpRestApiSendTokenBody {

    @ApiPropertyOptional({
        type: 'string',
        description: "Account private key",
        default: "0xACCOUNT_PRIVATE_KEY"
    })
    @IsNotEmpty({ message: 'Private key should not be empty' })
    @IsString({ message: 'Private key should be a string' })
    @Matches(/^[a-fA-F0-9]{64}$/, { message: 'Private key must be a 64-character hexadecimal string' })
    public privateKey: string;

    @ApiProperty({
        type: 'string',
        description: "ERC20 Token Address",
        default: "0x7218"
    })
    @IsNotEmpty({ message: 'Token address should not be empty' })
    @IsString({ message: 'Token address should be a string' })
    @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Token address must be a valid Ethereum address (0x followed by 40 hexadecimal characters)' })
    public tokenAddress: string;

    @ApiProperty({
        type: [String],
        description: "Array of receiver addresses",
        default: ["0xADDR1", "0xADDR2"],
    })
    @IsNotEmpty()
    @IsArray({ message: 'Receiver address must be an array' })
    @ArrayNotEmpty({ message: 'Receiver address array should not be empty' })
    @IsString({ each: true, message: 'Each receiver address must be a string' })
    public receiverAddress: string[];

    @ApiProperty({
        type: [String],
        description: "Array of amounts (without decimals)",
        default: ["0.0001", "0.0001"]
    })
    @IsNotEmpty()
    @IsArray({ message: 'Amount must be an array' })
    @ArrayNotEmpty({ message: 'Amount array should not be empty' })
    @IsString({ each: true, message: 'Each amount must be a string' })
    public amount: string[];

    @ApiPropertyOptional({
        type: 'string',
        description: "Gas Limit",
        default: "60000"
    })
    @IsOptional()
    @IsString({ message: 'Gas limit must be a string' })
    public gasLimit?: string;

    @ApiPropertyOptional({
        type: 'string',
        description: 'maxFeePerGas (in gwei)',
        default: "19"
    })
    @IsOptional()
    @IsString({ message: 'maxFeePerGas must be a string' })
    public maxFeePerGas?: string;

    @ApiPropertyOptional({
        type: 'string',
        description: 'maxPriorityFeePerGas (in gwei)',
        default: "0.1"
    })
    @IsOptional()
    @IsString({ message: 'maxPriorityFeePerGas must be a string' })
    public maxPriorityFeePerGas?: string;
}
