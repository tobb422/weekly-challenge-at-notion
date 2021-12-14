import { Type, Static } from '@sinclair/typebox'
import Ajv from 'ajv';

const userSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.Optional(Type.String()),
    avatarUrl: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
);
export type User = Static<typeof userSchema>;

const resultSchema = Type.Object({
  object: Type.String(),
  id: Type.String(),
  createdTime: Type.String(),
  lastEditedTime: Type.String(),
  properties: Type.Object({
    progress: Type.Object(
      {
        id: Type.String(),
        type: Type.String(),
        number: Type.Union([Type.Number(), Type.Null()])
      },
    ),
    person: Type.Object(
      {
        id: Type.String(),
        type: Type.String(),
        people: Type.Array(userSchema),
      },
    ),
    period: Type.Object(
      {
        id: Type.String(),
        type: Type.String(),
        date: Type.Union([
          Type.Object(
            {
              start: Type.Union([Type.String(), Type.Null()]),
              end: Type.Union([Type.String(), Type.Null()]),
            },
          ),
          Type.Null()
        ])
      },
    ),
    goal: Type.Object(
      {
        id: Type.String(),
        type: Type.String(),
        title: Type.Array(
          Type.Object(
            {
              type: Type.String(),
              plainText: Type.String(),
            },
          )
        ),
      },
    )
  }),
  url: Type.String(),
});

export type Result = Static<typeof resultSchema>;

export const schema = Type.Strict(
  Type.Object(
    {
      object: Type.String(),
      results: Type.Array(resultSchema),
    },
  )
);


export type Response = Static<typeof schema>;


const ajv = new Ajv({ strict: "log" });
export const validator = ajv.compile<Response>(schema);