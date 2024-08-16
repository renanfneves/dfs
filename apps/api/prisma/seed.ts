import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.chatSession.deleteMany()
  await prisma.subTopic.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.topicCategory.deleteMany()
  await prisma.agent.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      encryptedIp: '174b7b678d207cc407fba0ec6776454f',
    },
  })

  const firstAgent = await prisma.agent.create({
    data: {
      id: 'e1c6492c-ae5d-4d6e-a612-87a51519fb63',
      name: 'Robert C. Martin',
    },
  })

  await prisma.agent.createMany({
    data: [
      {
        id: '80fcba4c-fde5-4c15-92a4-24163462debe',
        name: 'Martin Fowler',
      },
      {
        id: '722b55fd-6535-4642-bba7-9ea93b0f1719',
        name: 'Richard Helm',
      },
      {
        id: '90fcba4c-fde5-4c15-92a4-24163462debe',
        name: 'Erich Gamma',
      },
      {
        id: '152f3fa8-d12b-4460-9c74-f423b463d76e',
        name: 'Ralph Johnson',
      },
      {
        id: 'f2f3fa8-d12b-4460-9c74-f423b463d76e',
        name: 'John Vlissides',
      },
    ],
  })

  await prisma.topicCategory.createMany({
    data: [
      {
        id: 'h2f3fa8-d12b-4460-9c74-f423b463d767',
        name: 'Football',
      },
      {
        id: '252f3fa8-d12b-4460-9c74-f423b463d76c',
        name: 'Books',
      },
    ],
  })

  await prisma.topic.createMany({
    data: [
      {
        id: 'h1c6492c-ae5d-4d6e-a612-87a51519fb64',
        topicCategoryId: 'h2f3fa8-d12b-4460-9c74-f423b463d767',
      },
      {
        id: '70fcba4c-fde5-4c15-92a4-24163462debb',
        topicCategoryId: '252f3fa8-d12b-4460-9c74-f423b463d76c',
      },
    ],
  })

  await prisma.subTopic.createMany({
    data: [
      {
        id: 's1c6492c-ae5d-4d6e-a612-87a51519fb64',
        topicId: 'h1c6492c-ae5d-4d6e-a612-87a51519fb64',
        name: 'Premier League',
        suggestions: ['Liverpool', 'Man. United', 'Manchester City'],
      },
      {
        id: 's2c6492c-ae5d-4d6e-a612-87a51519fb64',
        topicId: 'h1c6492c-ae5d-4d6e-a612-87a51519fb64',
        name: 'Serie A',
        suggestions: ['Milan', 'Inter', 'Juventus'],
      },
      {
        id: 's3c6492c-ae5d-4d6e-a612-87a51519fb64',
        topicId: '70fcba4c-fde5-4c15-92a4-24163462debb',
        name: 'Investment',
        suggestions: [
          'The Intelligent Investor - Benjamin Graham',
          'Rich Dad Poor Dad - Robert Kiyosaki',
        ],
      },
      {
        id: 's4c6492c-ae5d-4d6e-a612-87a51519fb64',
        topicId: '70fcba4c-fde5-4c15-92a4-24163462debb',
        name: 'Children',
        suggestions: ['Momo - Michael Ende', 'BFG - Roald Dahl'],
      },
    ],
  })

  await prisma.chatSession.create({
    data: {
      id: 'cs1c6492c-ae5d-4d6e-a612-87a51519fb64',
      topicId: 'h1c6492c-ae5d-4d6e-a612-87a51519fb64',
      subTopicId: 's1c6492c-ae5d-4d6e-a612-87a51519fb64',
      chosenSubject: 'Premier League Discussion',
      agentId: firstAgent.id,
      userId: user.id,
      status: 'open',
    },
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})
