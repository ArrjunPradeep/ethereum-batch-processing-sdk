import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('transaction')
export class TypeOrmTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sender: string;

    @Column()
    hash: string

    @Column()
    gasLimit: string;
   
    @Column()
    maxFeePerGas: string;
   
    @Column()
    maxPriorityFeePerGas: string;

    constructor(transaction: Partial<TypeOrmTransaction>) {
        Object.assign(this, transaction);
    }
    
}