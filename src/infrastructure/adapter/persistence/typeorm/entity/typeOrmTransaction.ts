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
    maxBaseFee: string;
   
    @Column()
    priorityFee: string;

    constructor(transaction: Partial<TypeOrmTransaction>) {
        Object.assign(this, transaction);
    }
    
}