import { Trooper } from '../trooper/trooper.interface';

export type Domain = 'com' | 'es' | 'fr';

export interface List {
    name: string;
    domain?: Domain;
    troopers: Trooper[]
}