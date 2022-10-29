import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";


@Entity({ name: 'image' })
export default class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column('varchar')
    url: string;

    @Column('varchar')
    description: string;

    @Column('varchar')
    varchar: string;
}
