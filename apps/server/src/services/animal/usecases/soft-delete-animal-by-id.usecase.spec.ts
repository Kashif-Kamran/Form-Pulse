import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SoftDeleteAnimalByIdUseCase } from './soft-delete-animal-by-id.usecase';
import { NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

describe('SoftDeleteAnimalByIdUseCase', () => {
  let useCase: SoftDeleteAnimalByIdUseCase;
  let mockAnimalModel: any;
  let mockDietPlanModel: any;
  let mockHealthRecordModel: any;

  beforeEach(async () => {
    // Mock session
    const mockSession = {
      withTransaction: jest.fn(),
      endSession: jest.fn(),
    };

    // Mock models
    mockAnimalModel = {
      findOne: jest.fn(),
      updateOne: jest.fn(),
    };

    mockDietPlanModel = {
      updateMany: jest.fn(),
    };

    mockHealthRecordModel = {
      updateMany: jest.fn(),
    };

    // Mock mongoose
    jest.spyOn(mongoose, 'startSession').mockResolvedValue(mockSession as any);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoftDeleteAnimalByIdUseCase,
        {
          provide: getModelToken('Animal'),
          useValue: mockAnimalModel,
        },
        {
          provide: getModelToken('DietPlan'),
          useValue: mockDietPlanModel,
        },
        {
          provide: getModelToken('AnimalHealthRecord'),
          useValue: mockHealthRecordModel,
        },
      ],
    }).compile();

    useCase = module.get<SoftDeleteAnimalByIdUseCase>(
      SoftDeleteAnimalByIdUseCase,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should throw NotFoundException when animal not found', async () => {
    mockAnimalModel.findOne.mockResolvedValue(null);

    await expect(useCase.execute('nonexistent-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should successfully soft delete animal and related records', async () => {
    const mockAnimal = { _id: 'animal-id', name: 'Test Animal' };
    const testAnimalId = 'test-animal-id';

    mockAnimalModel.findOne.mockResolvedValue(mockAnimal);

    // Mock successful transaction
    const mockSession = {
      withTransaction: jest.fn().mockImplementation(async (fn) => {
        await fn();
      }),
      endSession: jest.fn(),
    };

    jest.spyOn(mongoose, 'startSession').mockResolvedValue(mockSession as any);

    const result = await useCase.execute(testAnimalId);

    expect(result).toEqual({
      message: 'Animal and related records successfully deleted',
      deletedAt: expect.any(String),
      animalId: testAnimalId,
    });

    expect(mockAnimalModel.findOne).toHaveBeenCalledWith({
      _id: expect.any(mongoose.Types.ObjectId),
      isDeleted: { $ne: true },
    });
  });
});
