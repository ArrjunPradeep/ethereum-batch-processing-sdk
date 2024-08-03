import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

/**
 * ErrorDTO is a Data Transfer Object that represents the structure of error responses
 * returned by the API. It ensures that error responses have a consistent format,
 * making it easier for clients to handle errors uniformly.
 */
export class ErrorDTO {

  /**
   * A descriptive message about the error. This message helps clients understand 
   * what went wrong during the request processing.
   * 
   */
  @ApiProperty({ default: 'Internal Server Error' })
  message: string;

  /**
   * The HTTP status code associated with the error. It indicates the type of error
   * that occurred, such as 500 for internal server errors or 404 for not found errors.
   * 
   */
  @ApiProperty({ enum: HttpStatus, default: HttpStatus.INTERNAL_SERVER_ERROR })
  status_code: HttpStatus;

  /**
   * The timestamp of when the error occurred. This helps with debugging and logging,
   * providing context on when the error happened.
   * 
   * @example new Date().toISOString()
   */
  @ApiProperty({ default: new Date().toISOString() })
  date: Date;
}