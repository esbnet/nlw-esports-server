import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convertHourToMinutes } from './utils/convert-hour-to-minute'
import { convertMinutesToHour } from './utils/convert-minute-to-hour'

const PORT = 3333;

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  // log: ['query'],
})

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  })
  return res.status(200).json(games)
})

app.post('/game/:id/ads', async (req, res) => {
  const gameId = req.params.id
  const body = req.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discordId: body.discordId,
      weekDays: body.weekDays,
      hourStart: convertHourToMinutes(body.hourStart),
      hourEnd: convertHourToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  })

  return res.status(201).json(ad)
})

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      gameId: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
      createdAt: true,
    },
    where: { gameId: gameId },
    orderBy: { createdAt: 'desc' },
  })
  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHour(ad.hourStart),
        hourEnd: convertMinutesToHour(ad.hourEnd),
      }
    })
  )
})

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: { discordId: true },
    where: { id: adId },
  })

  return res.status(200).json({ discord: ad.discordId })
})

app.listen(PORT, () => {
	console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});