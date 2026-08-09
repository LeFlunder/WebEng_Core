import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Brewery } from './brewery.entity';
import { BeerStyle } from './beer-style.entity';
import { Review } from './review.entity';
import { UserBeerEntry } from './user-entry.entity';

@Entity()
export class Beer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true })
  abv!: number;

  @Column({ nullable: true })
  ibu!: number;

  @Column({ nullable: true })
  ebc!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  // Relations
  @ManyToOne(() => Brewery, (brewery) => brewery.beers, { eager: true })
  brewery!: Brewery;

  @ManyToOne(() => BeerStyle, (style) => style.beers, { eager: true })
  style!: BeerStyle;

  @OneToMany(() => Review, (review) => review.beer)
  reviews!: Review[];

  @OneToMany(() => UserBeerEntry, (entry) => entry.beer)
  userEntries!: UserBeerEntry[];

  // Computed / cached
  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  avgRating!: number;

  @Column({ default: 0 })
  ratingCount!: number;
}
