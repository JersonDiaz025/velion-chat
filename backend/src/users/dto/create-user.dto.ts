import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  // @MinLength(6)
  @IsNotEmpty()
  password!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatarColor?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  initials?: string;
}
