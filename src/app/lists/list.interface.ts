
import { Trooper } from '../trooper/trooper.interface';

export interface List {
    name: string;
    domain?: string;
    troopers: Trooper[]
}