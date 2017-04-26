interface Skill {
    icon: string;
    id: number;
    name: string;
    description: string;
}

export interface Report {
    battles: boolean[];
    missions: boolean[];
    raid: number;

    skills: Skill[];
    availableSkills: Skill[];

    totalMoney: number;
    requiredMoney: number;
}