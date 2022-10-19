import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateMatchDto } from './create-match.dto';

export class UpdateMatchDto {
    @IsNumber()
    resultTeam1: number;

    @IsNumber()
    resultTeam2: number;
}
