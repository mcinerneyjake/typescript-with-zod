import { z } from 'zod';

/* DOCUMENTATION

https://github.com/colinhacks/zod

*/

/************************************************************* */

/* TYPESCRIPT with ZOD SCHEME VALIDATION */

// const hobbies = ['Woodworking', 'Biking', 'Guitar'];

const UserSchema = z.object({
  username: z.string().min(3),
  age: z.number().gt(0),
  birthday: z.date().optional(),
  isDeveloper: z.boolean().nullable().default(false),
  isSuperCool: z.literal(true),
  hobbies: z.enum(['Woodworking', 'Biking', 'Guitar']),
  family: z.array(z.string()).nonempty(),
  coordinates: z.tuple([z.number(), z.string(), z.number().gt(80).int()]),
  // hobbies: z.enum(hobbies),
  // testUndefined: z.undefined(),
  // testNull: z.null(),
  // testNever: z.never(),
  // testVoid: z.void(),
  // testAny: z.any(),
  // testUnknown: z.unknown()
})
// .strict()
// .passthrough()
// .pick({ age: 101 })
// .omit({ age: true })
// .partial()
// .deepPartial()
// .extend({ name: z.string() })
// .merge(z.object({ name: z.string() }))
;

// let thisDoesNotExist;

/*

There's no need to use TypeScript's explicit type declarations:

type User = {
  username: string
};

Instead, we can infer the type via the schema's shape (example directly below):

*/
type User = z.infer<typeof UserSchema>;

const user: User = { 
  username: 'jakeinerney',
  age: 32,
  birthday: new Date(),
  isDeveloper: true, 
  isSuperCool: true,
  hobbies: 'Guitar',
  family: ['Kaitlin', 'Charlie'],
  coordinates: [45, '38', 87],
  // testUndefined: undefined,
  // testNull: null,
  // testNever: null,
  // testVoid: thisDoesNotExist,
  // testAny: undefined || null || 1 || 'Hello',
  // testUnknown: undefined || null || 1 || 'Hello'.
  // name: 'Jake'
};


// PARSE
console.log(UserSchema.parse(user));

// SHAPE
// console.log(UserSchema.shape.username);

// PARTIAL
// console.log(UserSchema.partial().parse(user));

/************************************************************* */

/* ZOD ERROR HANDLING */

// Zod throws an error with unexpected input types
// const user: User = { username: 1 };

// parseSafe() gives us a both a boolean that determines whether a parse will be successful, and a ZodError
// This method can be useful for form validation
// console.log(UserSchema.parseSafe(user));

