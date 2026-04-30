import { Prisma } from '@prisma/client';

export const softDeleteExtension = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    $allModels: {
      async delete<M, A>(
        this: M,
        args: Prisma.Args<M, 'delete'>
      ): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);
        const timestamp = Date.now();

        // Type casting para la operación de borrado
        const _args = args as { where: Prisma.Args<M, 'delete'>['where'] };

        const item = await (context as any).findUnique({
          where: _args.where,
        });

        return (context as any).update({
          where: _args.where,
          data: {
            deletedAt: new Date(),
            ...(item?.email && { email: `deleted_${timestamp}_${item.email}` }),
            ...(item?.username && { username: `deleted_${timestamp}_${item.username}` }),
          },
        });
      },
    },
  },
  query: {
    $allModels: {
      async $allOperations({ operation, args, query }) {
        // 1. Definimos las operaciones que SÍ tienen 'where'
        const operationsWithWhere = [
          'findFirst',
          'findMany',
          'count',
          'findUnique',
          'update',
          'updateMany',
          'delete',
          'deleteMany',
        ];

        // 2. Solo modificamos args si la operación está en la lista y args existe
        if (operationsWithWhere.includes(operation)) {
          // Usamos type casting aquí también para evitar el error de TS2339
          const queryArgs = args as { where?: any };

          queryArgs.where = {
            ...queryArgs.where,
            deletedAt: null,
          };
          return query(args);
        }

        return query(args);
      },
    },
  },
});
