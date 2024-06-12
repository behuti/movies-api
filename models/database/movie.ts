import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import { PartialMovie } from '../../schemas/types.js'
const dbUser = process.env.MONGODB_USER
const dbPassword = process.env.MONGODB_PASS

const uri =
  'mongodb+srv://' +
  dbUser +
  ':' +
  dbPassword +
  '@cluster0.h6e21mw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connect() {
  try {
    await client.connect()
    const database = client.db('database')
    return database.collection('movies')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class MovieModel {
  static async getAll({ genre }: { genre: string }) {
    const db = await connect()

    if (!db) return
    if (genre) {
      return db
        .find({
          genre: {
            $elemMatch: {
              $regex: genre,
              $options: 'i'
            }
          }
        })
        .toArray()
    }

    return db.find({}).toArray()
  }

  static async getById({ id }: { id: string }) {
    const db = await connect()
    if (!db) return
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async create({ input }: { input: PartialMovie }) {
    const db = await connect()
    if (!db) return
    const { insertedId } = await db.insertOne(input)

    return {
      id: insertedId,
      ...input
    }
  }

  static async delete({ id } : { id: string }) {
    const db = await connect()
    if (!db) return
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update({ id, input }: { id: string; input: PartialMovie }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    if(!db) return
    const { ok, value } = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      // @ts-ignore
      { returnNewDocument: true }
    )

    if (!ok) return false

    return value
  }
}
