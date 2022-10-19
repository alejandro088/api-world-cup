import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Request, Response } from 'express';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamService: TeamsService) {}

  @Post()
  async create(@Res() response: Response, @Body() createTeamDto: CreateTeamDto) {
    try {
      const res = await this.teamService.create(createTeamDto);
      console.log(res);
      return response.status(201).json(res);
    } catch (e: any) {
      return response.status(500).json({error: e.message})
    }
  }

  @Post('/upsert')
  upsert(@Req() request: Request) {
    return this.teamService.upsert(request);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: number) {
    const team = await this.teamService.findOne(+id);

    if(!team) {
      return response.status(404).json({error: 'the record has not found'})
    }

    return response.status(200).json(team);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const res = await this.teamService.remove(+id);
      return response.status(200).json(res);
    } catch (e: any) {
      return response.status(404).json({error: e.message})
    }
  }
}
