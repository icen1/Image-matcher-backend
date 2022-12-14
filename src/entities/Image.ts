import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'images' })
export default class Image {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column('varchar', { nullable: true })
        created?: string;

    @Column('varchar')
        url: string;

    @Column('varchar')
        url_large: string;

    @Column('varchar')
        title: string;

    @Column('varchar')
        author: string;

    @Column('varchar', { nullable: true })
        description?: string;

    @Column('varchar')
        hash: string;

    @Column('integer', { default: 0, nullable: true })
        likes?: number;
}
