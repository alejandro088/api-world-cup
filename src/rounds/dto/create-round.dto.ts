import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateRoundDto {
    @IsString()
    title: string;

    @Type(() => Date)
    @IsDate()
    start_at: Date;

    @Type(() => Date)
    @IsDate()
    end_at: Date;
}
