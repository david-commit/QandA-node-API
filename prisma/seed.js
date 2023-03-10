import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const users = [
  {
    full_name: 'Sheelah Waringa',
    email: 'sheelahh@gmail.com',
    password: 'sheelah',
    phone: '+25475455568',
    role: 'Community Developer',
  },
  {
    full_name: 'Cynthia Njomo',
    email: 'cynthiah@gmail.com',
    password: 'cynthia',
    phone: '+25475455568',
    role: 'Community Legal Advisor',
  },
  {
    full_name: 'Prince Kim',
    email: 'prinche@gmail.com',
    password: 'prince',
    phone: '+25475455568',
    role: 'Local DJ',
  },
  {
    full_name: 'Sheila Rugut',
    email: 'sheilah@gmail.com',
    password: 'sheila',
    phone: '+25475455568',
    role: 'Researcher',
  },
];

const questions = [
  {
    question: 'When is the community festival happenening?',
    user_id: 1,
  },

  {
    question: "How many students don't have adequate school textbooks?",
    user_id: 2,
  },
  {
    question:
      'Would buiding a Tech Hub at the community center help the community?',
    user_id: 4,
  },
];

const answers = [
  {
    answer:
      'The event is happening next Friday at the community square. All are invited.',
    question_id: 1,
  },
  {
    answer:
      'YES! That is a great idea. This would harbour learning and being innovative in looking for solutions for the community.',
    question_id: 3,
  },
  {
    answer: 'It was confirmed to happen this coming Friday.',
    question_id: 1,
  },
  {
    answer:
      'If you take a look at an instance of the Community School, a third are still lacking textbooks. Hope that helps in doing your projections.',
    question_id: 2,
  },
  {
    answer: 'Yes. It would in a very huge way.',
    question_id: 3,
  },
  {
    answer: "This Friday. I don't think it'll be pushed over again.",
    question_id: 1,
  },

  {
    answer: 'Yes, great idea.',
    question_id: 3,
  },
];

const main = async () => {
  console.log('Begin Seeding...');
  console.log('Seeding users...');
  for (let user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  // console.log('Seeding questions..');
  // for (let question of questions) {
  //   await prisma.question.create({
  //     data: question,
  //   });
  // }

  // console.log('Seeding answers..');
  // for (let answer of answers) {
  //   await prisma.answer.create({
  //     data: answer,
  //   });
  // }
};

main().catch( error => {
  console.log(error)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})