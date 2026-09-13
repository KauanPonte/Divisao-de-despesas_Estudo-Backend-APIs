#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/d7dd2e71b97b46cf5ceb45ba2aaf1fbf9716e7d82f16a8bbb9c2e97d83172884/contract';
import endContract from '../../snapshots/d7dd2e71b97b46cf5ceb45ba2aaf1fbf9716e7d82f16a8bbb9c2e97d83172884/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'expense_shares',
        columns: [
          col('centavos', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('expenseId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'expenses',
        columns: [
          col('centavos', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('groupId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('payerId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'group_members',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('groupId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'groups',
        columns: [
          col('authorId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'settlements',
        columns: [
          col('centavos', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('groupId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('payingId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('receiverId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password_hash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'expense_shares',
        constraint: 'expense_shares_userId_expenseId_key',
        columns: ['userId', 'expenseId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'group_members',
        constraint: 'group_members_userId_groupId_key',
        columns: ['userId', 'groupId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'expense_shares',
        index: 'expense_shares_expenseId_idx_69d413fa',
        columns: ['expenseId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'expense_shares',
        index: 'expense_shares_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'expenses',
        index: 'expenses_groupId_idx_e2fb5578',
        columns: ['groupId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'expenses',
        index: 'expenses_payerId_idx_3d3ae95d',
        columns: ['payerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'group_members',
        index: 'group_members_groupId_idx_e2fb5578',
        columns: ['groupId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'group_members',
        index: 'group_members_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'groups',
        index: 'groups_authorId_idx_e47547ed',
        columns: ['authorId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'settlements',
        index: 'settlements_groupId_idx_e2fb5578',
        columns: ['groupId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'settlements',
        index: 'settlements_payingId_idx_3085725d',
        columns: ['payingId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'settlements',
        index: 'settlements_receiverId_idx_fe124f44',
        columns: ['receiverId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'expense_shares',
        foreignKey: {
          name: 'expense_shares_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'expense_shares',
        foreignKey: {
          name: 'expense_shares_expenseId_fkey',
          columns: ['expenseId'],
          references: { schema: 'public', table: 'expenses', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'expenses',
        foreignKey: {
          name: 'expenses_payerId_fkey',
          columns: ['payerId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'expenses',
        foreignKey: {
          name: 'expenses_groupId_fkey',
          columns: ['groupId'],
          references: { schema: 'public', table: 'groups', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'group_members',
        foreignKey: {
          name: 'group_members_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'group_members',
        foreignKey: {
          name: 'group_members_groupId_fkey',
          columns: ['groupId'],
          references: { schema: 'public', table: 'groups', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'groups',
        foreignKey: {
          name: 'groups_authorId_fkey',
          columns: ['authorId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'settlements',
        foreignKey: {
          name: 'settlements_payingId_fkey',
          columns: ['payingId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'settlements',
        foreignKey: {
          name: 'settlements_receiverId_fkey',
          columns: ['receiverId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'settlements',
        foreignKey: {
          name: 'settlements_groupId_fkey',
          columns: ['groupId'],
          references: { schema: 'public', table: 'groups', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
