import {Prisma, PrismaClient, Status} from '@prisma/client';
import chalk from 'chalk';
import {z} from 'zod';

const prisma = new PrismaClient();

const IssueSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required').max(65535),
    status: z.nativeEnum(Status).optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  })
  .strict();

const issues: Prisma.IssueCreateInput[] = [
  {
    title: 'UI Overhaul for Dashboard',
    description:
      'The dashboard UI looks outdated and needs a complete overhaul to improve usability and aesthetics. This includes updating colors, fonts, and layout adjustments.',
    status: 'IN_PROGRESS',
    createdAt: '2024-09-15T10:30:00.000Z',
    updatedAt: '2024-11-01T19:31:18.135Z',
  },
  {
    title: 'Bug in Login Authentication',
    description:
      'Users are unable to log in when using certain special characters in their passwords. This needs urgent fixing as it affects all users with complex passwords.',
    status: 'OPEN',
    createdAt: '2024-10-01T08:15:00.000Z',
    updatedAt: '2024-11-01T20:03:22.483Z',
  },
  {
    title: 'Database Optimization Required',
    description:
      'Queries are taking longer than expected to execute on high-traffic days. Optimizing indexes and refactoring queries should reduce load times.',
    status: 'CLOSED',
    createdAt: '2024-08-21T14:50:00.000Z',
    updatedAt: '2024-09-05T13:40:00.000Z',
  },
  {
    title: 'Fix Profile Picture Upload',
    description:
      'Some users report that their profile pictures fail to upload. The issue seems to be related to specific image formats.',
    status: 'OPEN',
    createdAt: '2024-10-12T09:00:00.000Z',
    updatedAt: '2024-10-12T09:00:00.000Z',
  },
  {
    title: 'Add Search Functionality to Blog',
    description:
      'Users have requested the ability to search through blog posts by keywords. Implementing search functionality would greatly improve user experience.',
    status: 'IN_PROGRESS',
    createdAt: '2024-09-30T08:15:00.000Z',
    updatedAt: '2024-10-24T10:45:00.000Z',
  },
  {
    title: 'Mobile Responsiveness Issues',
    description:
      'The website does not display correctly on mobile devices. Certain elements are misaligned, and buttons are not clickable.',
    status: 'OPEN',
    createdAt: '2024-10-05T12:30:00.000Z',
    updatedAt: '2024-10-05T12:30:00.000Z',
  },
  {
    title: '404 Page Redesign',
    description:
      'The current 404 error page is uninformative and could be redesigned to help guide users back to the main sections of the site.',
    status: 'CLOSED',
    createdAt: '2024-07-12T15:30:00.000Z',
    updatedAt: '2024-08-15T16:00:00.000Z',
  },
  {
    title: 'User Profile Privacy Settings',
    description:
      'Users should have more control over their privacy settings, such as deciding who can view their profiles and activity.',
    status: 'OPEN',
    createdAt: '2024-10-09T11:45:00.000Z',
    updatedAt: '2024-10-09T11:45:00.000Z',
  },
  {
    title: 'Integration with Third-Party Analytics',
    description:
      'Integrate Google Analytics and other third-party analytics tools to track and improve user engagement.',
    status: 'IN_PROGRESS',
    createdAt: '2024-09-18T13:25:00.000Z',
    updatedAt: '2024-10-22T14:50:00.000Z',
  },
  {
    title: 'Fix Slow Loading Times on Home Page',
    description:
      'The home page takes too long to load, especially on slower connections. The issue may be due to large images or unoptimized scripts.',
    status: 'CLOSED',
    createdAt: '2024-08-05T07:15:00.000Z',
    updatedAt: '2024-08-18T08:20:00.000Z',
  },
  {
    title: 'Add Dark Mode Option',
    description:
      'Users have requested a dark mode option for the platform. Adding this will enhance accessibility for those sensitive to bright light.',
    status: 'OPEN',
    createdAt: '2024-10-07T08:00:00.000Z',
    updatedAt: '2024-10-07T08:00:00.000Z',
  },
  {
    title: 'Fix Email Notification Delays',
    description:
      'Email notifications for account activities are delayed by up to several hours. Timely notifications are essential for maintaining user engagement.',
    status: 'CLOSED',
    createdAt: '2024-07-20T15:45:00.000Z',
    updatedAt: '2024-08-10T16:30:00.000Z',
  },
  {
    title: 'Implement CAPTCHA on Login',
    description:
      'Add CAPTCHA verification on the login page to prevent automated login attempts and reduce brute-force attack risks.',
    status: 'IN_PROGRESS',
    createdAt: '2024-10-02T09:30:00.000Z',
    updatedAt: '2024-10-25T12:15:00.000Z',
  },
  {
    title: 'Create Onboarding Guide for New Users',
    description:
      'An interactive onboarding guide could improve retention by helping new users learn how to navigate the platform more effectively.',
    status: 'OPEN',
    createdAt: '2024-10-11T10:45:00.000Z',
    updatedAt: '2024-10-11T10:45:00.000Z',
  },
  {
    title: 'Bug in Password Reset Flow',
    description:
      'Users report that they are not receiving password reset emails, which prevents them from recovering their accounts.',
    status: 'OPEN',
    createdAt: '2024-10-10T14:00:00.000Z',
    updatedAt: '2024-10-10T14:00:00.000Z',
  },
  {
    title: 'Redesign Notification System',
    description:
      'The current notification system is cluttered. Users should be able to choose the types of notifications they receive.',
    status: 'IN_PROGRESS',
    createdAt: '2024-09-25T11:15:00.000Z',
    updatedAt: '2024-10-23T09:30:00.000Z',
  },
  {
    title: 'Fix Scroll Issue on iOS',
    description:
      'On iOS devices, users cannot scroll to the bottom of certain pages. This issue seems specific to Safari.',
    status: 'OPEN',
    createdAt: '2024-10-08T16:00:00.000Z',
    updatedAt: '2024-10-08T16:00:00.000Z',
  },
  {
    title: 'Add Weekly Email Digest Feature',
    description:
      'Implement a weekly email digest for users, summarizing important activities and updates from the past week.',
    status: 'CLOSED',
    createdAt: '2024-08-30T13:00:00.000Z',
    updatedAt: '2024-09-20T14:25:00.000Z',
  },
  {
    title: 'Improve Accessibility for Screen Readers',
    description:
      'Audit and improve accessibility features to support screen readers, ensuring a smoother experience for visually impaired users.',
    status: 'IN_PROGRESS',
    createdAt: '2024-10-03T14:30:00.000Z',
    updatedAt: '2024-10-25T10:40:00.000Z',
  },
  {
    title: 'Fix Infinite Scroll Bug on Blog',
    description:
      'The infinite scroll feature on the blog page occasionally fails to load new posts. This happens randomly and needs debugging.',
    status: 'OPEN',
    createdAt: '2024-10-06T10:10:00.000Z',
    updatedAt: '2024-10-06T10:10:00.000Z',
  },
  {
    title: 'Performance Monitoring Dashboard',
    description:
      'Create a comprehensive dashboard to track application performance metrics, including response times, error rates, and server resource utilization.',
    status: 'IN_PROGRESS',
    createdAt: '2024-11-10T14:30:00.000Z',
    updatedAt: '2024-11-25T11:15:00.000Z',
  },
  {
    title: 'Implement Real-Time Collaboration Features',
    description:
      'Develop collaborative editing capabilities that allow multiple users to work on the same document simultaneously with live updates and version tracking.',
    status: 'IN_PROGRESS',
    createdAt: '2024-11-12T13:20:00.000Z',
    updatedAt: '2024-11-26T09:45:00.000Z',
  },
  {
    title: 'Advanced User Permissions System',
    description:
      'Design and implement a flexible role-based access control system that allows granular permissions for different user types and organizational hierarchies.',
    status: 'OPEN',
    createdAt: '2024-11-14T11:10:00.000Z',
    updatedAt: '2024-11-14T11:10:00.000Z',
  },
  {
    title: 'Payment Gateway Integration',
    description:
      'Integrate multiple payment providers including Stripe, PayPal, and local payment methods. Implement secure transaction handling and robust error management.',
    status: 'IN_PROGRESS',
    createdAt: '2024-11-09T15:45:00.000Z',
    updatedAt: '2024-11-24T16:30:00.000Z',
  },
  {
    title: 'Machine Learning Recommendation Engine',
    description:
      'Build a recommendation system that uses machine learning algorithms to provide personalized content and feature suggestions based on user behavior.',
    status: 'OPEN',
    createdAt: '2024-11-11T16:20:00.000Z',
    updatedAt: '2024-11-11T16:20:00.000Z',
  },
  {
    title: 'API Rate Limiting and Throttling',
    description:
      'Implement comprehensive rate limiting and request throttling mechanisms to prevent API abuse and ensure fair usage across different client types.',
    status: 'IN_PROGRESS',
    createdAt: '2024-11-13T10:00:00.000Z',
    updatedAt: '2024-11-27T14:15:00.000Z',
  },
  {
    title: 'Data Export and Backup Solution',
    description:
      'Develop robust data export functionality allowing users to download their data in multiple formats (CSV, JSON, PDF) and implement automated backup strategies.',
    status: 'OPEN',
    createdAt: '2024-11-16T13:55:00.000Z',
    updatedAt: '2024-11-16T13:55:00.000Z',
  },
  {
    title: 'Containerization and Deployment Workflow',
    description:
      'Create Docker containers for the application and develop a CI/CD pipeline using GitHub Actions for automated testing and deployment across staging and production environments.',
    status: 'IN_PROGRESS',
    createdAt: '2024-11-07T08:30:00.000Z',
    updatedAt: '2024-11-22T11:40:00.000Z',
  },
];

const seedDatabase = async () => {
  console.time(chalk.blue('🕒 Total Seeding Time'));
  console.log(chalk.green('🌱 Starting database seeding...'));

  try {
    const validatedIssues = issues.map(issue => {
      try {
        return IssueSchema.parse(issue);
      } catch (validationError) {
        console.error(
          chalk.red(`❌ Validation error in issue: ${issue.title}`),
          validationError,
        );
        throw validationError;
      }
    });

    const result = await prisma.$transaction(async tx => {
      // Clear existing data before seeding (Optional)
      const deleteCount = await tx.issue.deleteMany({});
      console.log(
        chalk.yellow(`🗑️  Deleted ${deleteCount.count} existing issues`),
      );

      const createResult = await tx.issue.createMany({
        data: validatedIssues,
        skipDuplicates: true,
      });

      return {
        deletedCount: deleteCount.count,
        createdCount: createResult.count,
      };
    });

    console.log(
      chalk.green(`✅ Successfully seeded ${result.createdCount} issues`),
    );
  } catch (error) {
    console.error(chalk.red('❌ Seeding failed:'), error);
    process.exit(1);
  } finally {
    console.timeEnd(chalk.blue('🕒 Total Seeding Time'));
    await prisma.$disconnect();
  }
};

seedDatabase().catch(e => {
  console.error(chalk.red('❌ Unhandled error during seeding:'), e);
  process.exit(1);
});
