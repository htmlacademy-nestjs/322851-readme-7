import { PrismaClient, PostType } from '@prisma/client';

const FIRST_POST_UUID = crypto.randomUUID();
const SECOND_POST_UUID = crypto.randomUUID();
const THIRD_POST_UUID = crypto.randomUUID();
const FOURTH_POST_UUID = crypto.randomUUID();
const FIFTH_POST_UUID = crypto.randomUUID();

const VIDEO_ID = crypto.randomUUID();
const PHOTO_ID = crypto.randomUUID();
const LINK_ID = crypto.randomUUID();
const QUOTE_ID = crypto.randomUUID();
const TEXT_ID = crypto.randomUUID();

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: PostType.VIDEO,
      userId: FIRST_USER_ID,
      tags: {
        connectOrCreate: [
          {
            create: {title: '#js'},
            where: { title: '#js' }
          },
          {
            create: {title: '#helloworld'},
            where: { title: '#helloworld' }
          }
        ]
      },
      comments: [
        {
          text: 'Это действительно отличная книга!',
          userId: FIRST_USER_ID,
        },
        {
          text: 'Надо будет обязательно перечитать. Слишком много информации.',
          userId: SECOND_USER_ID,
        }
      ],
      likes: [
        {userId: SECOND_USER_ID}
      ],
      video: {
        create: getVideoPost()
      }
    },
    {
      id: SECOND_POST_UUID,
      type: PostType.LINK,
      userId: FIRST_USER_ID,
      tags: {
        connectOrCreate: [
          {
            create: {title: '#js'},
            where: { title: '#js' }
          }
        ]
      },
      link: {
        create: getLinkPost()
      }
    },
    {
      id: THIRD_POST_UUID,
      type: PostType.QUOTE,
      userId: SECOND_USER_ID,
      tags: {
        connectOrCreate: [
          {
            create: {title: '#js'},
            where: { title: '#js' }
          }
        ]
      },
      likes: [
        {userId: FIRST_USER_ID}
      ],
      quote: {
        create: getQuotePost()
      }
    },
    {
      id: FOURTH_POST_UUID,
      type: PostType.PHOTO,
      userId: SECOND_USER_ID,
      tags: {
        connectOrCreate: [
          {
            create: {title: '#js'},
            where: { title: '#js' }
          }
        ]
      },
      photo: {
        create: getPhotoPost()
      }
    },
    {
      id: FIFTH_POST_UUID,
      type: PostType.TEXT,
      userId: FIRST_USER_ID,
      tags: {
        connectOrCreate: [
          {
            create: {title: '#node'},
            where: { title: '#node'}
          }
        ]
      },
      text: {
        create: getTextPost()
      }
    }
  ]
}

function getVideoPost() {
  return {
      id: VIDEO_ID,
      url: 'https://www.youtube.com/watch?v=aY1E8jegel8',
    }
}

function getLinkPost() {
  return {
      id: LINK_ID,
      url: 'https://nodejs.org/dist/latest-v20.x/docs/api/',
      description: 'Node.js v20.16.0 documentation'
    }
}

function getQuotePost() {
  return {
      id: QUOTE_ID,
      content: 'Жизнь - это то, что с тобой происходит, пока ты строишь планы.',
      author: 'Джон Леннон'
    }
}

function getPhotoPost() {
  return {
      id: PHOTO_ID,
      path: 'image.jpg'
    }
}

function getTextPost() {
  return {
      id: TEXT_ID,
      title: 'Худеющий',
      preview: 'Недавно прочитал страшный роман «Худеющий».',
      content: 'На мой взгляд, это один из самых страшных романов Стивена Кинга.',
    }
}

async function seedDb(prismaClient: PrismaClient) {
  const posts = getPosts();
  for(const post of posts) {
    await prismaClient.post.upsert({
      where: {id: post.id},
      update: {},
      create: {
        id: post.id,
        type: post.type,
        userId: post.userId,
        commentsCount: post.comments?.length ?? 0,
        tags: post.tags,
        comments: post.comments && post.comments.length > 0 ? {create: post.comments} : undefined,
        likes: post.likes?.length ? { create: post.likes }: undefined,
        video: post.video ?? undefined,
        photo: post.photo ?? undefined,
        quote: post.quote ?? undefined,
        text: post.text ?? undefined,
        link: post.link ?? undefined,
      }
    })
  }
  console.info('Database was filled')
}


async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch(error: unknown) {
    console.error(error);
    globalThis.process.exit(1)
  } finally {
    await prismaClient.$disconnect;
    console.log('Prisma client disconnected')
  }
}

bootstrap();
