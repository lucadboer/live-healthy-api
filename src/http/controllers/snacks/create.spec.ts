// import { beforeEach, describe, expect, it } from 'vitest'
// import { randomUUID } from 'crypto'
// import { CreateSnackService } from '@/services/create-snack'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
// import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'

// let snacksRepository: PrismaSnacksRepository
// let usersRepository: PrismaUsersRepository
// let sut: CreateSnackService

// describe('Create snack Service', async () => {
//   beforeEach(() => {
//     usersRepository = new PrismaUsersRepository()
//     snacksRepository = new PrismaSnacksRepository()

//     sut = new CreateSnackService(snacksRepository, usersRepository)
//   })

//   const testUser = {
//     id: randomUUID(),
//     name: 'John Doe',
//     email: 'john@doe.com',
//     password_hash: '123456',
//   }

//   it('should be able to create a new snack', async () => {
//     const { id } = await usersRepository.create(testUser)

//     const { snack } = await sut.execute({
//       id: 'snack-01',
//       title: 'Rice and Beans',
//       description: '',
//       date: new Date(),
//       hour: '12:00',
//       is_diet: true,
//       user_id: id,
//     })

//     expect(snack.is_diet).toEqual(true)
//   })

//   it('should not be able to create a new stack without user', async () => {
//     expect(async () => {
//       await sut.execute({
//         id: '123456',
//         title: 'Rice and Beens',
//         description: '',
//         date: new Date(),
//         hour: '12:00',
//         is_diet: true,
//         user_id: 'does not exist',
//       })
//     }).rejects.toBeInstanceOf(ResourcesNotFoundError)
//   })
// })
