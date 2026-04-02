import { load } from 'cheerio'

const STAGE_FR_URL = 'https://www.stage.fr/jobs/?q=stage&job_type[]=STAGE'

interface ImportOffersResponse {
  imported: number
  failed: number
  totalFound: number
  message: string
}

interface OfferImportPayload {
  title: string
  company: string
  location: string
  type: string
  description: null
  salary: null
  contractType: null
  startDate: null
}

function toErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message
  return fallback
}

export default defineEventHandler(async (event): Promise<ImportOffersResponse> => {
  const runtimeConfig = useRuntimeConfig(event)
  const apiBase = String(runtimeConfig.public.apiBase || '').replace(/\/$/, '')

  if (!apiBase) {
    return {
      imported: 0,
      failed: 0,
      totalFound: 0,
      message: "Configuration invalide: 'runtimeConfig.public.apiBase' est vide.",
    }
  }

  let titles: string[] = []

  try {
    // Récupération du HTML de la page stage.fr
    const html = await $fetch<string>(STAGE_FR_URL, {
      responseType: 'text',
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; InternshipReviewBot/1.0)',
        'accept-language': 'fr-FR,fr;q=0.9',
      },
    })

    // Parsing du HTML avec cheerio
    const $ = load(html)
    // Extraction des titres des offres
    titles = $('.listing-item__title')
      .map((_, element) => $(element).text().replace(/\s+/g, ' ').trim())
      .get()
      .filter((title) => title.length > 0)
  } catch (error: unknown) {
    return {
      imported: 0,
      failed: 0,
      totalFound: 0,
      message: `Impossible de recuperer ou parser la source stage.fr: ${toErrorMessage(error, 'erreur inconnue')}.`,
    }
  }

  if (titles.length === 0) {
    return {
      imported: 0,
      failed: 0,
      totalFound: 0,
      message: 'Aucun titre exploitable trouve sur la page stage.fr cible.',
    }
  }

  let imported = 0
  let failed = 0

  // Création des offres avec les titres extraits
  for (const title of titles) {
    const offerPayload: OfferImportPayload = {
      title,
      company: 'stage.fr',
      location: 'France',
      type: 'Stage',
      description: null,
      salary: null,
      contractType: null,
      startDate: null,
    }

    try {
      // Insertion des offres dans la base de données json-server
      await $fetch(`${apiBase}/offers`, {
        method: 'POST',
        body: offerPayload,
      })
      imported += 1
    } catch {
      failed += 1
    }
  }

  if (failed > 0) {
    return {
      imported,
      failed,
      totalFound: titles.length,
      message: `Import termine avec erreurs: ${imported} succes, ${failed} echecs sur ${titles.length} titres.`,
    }
  }

  return {
    imported,
    failed,
    totalFound: titles.length,
    message: `Import termine: ${imported} offres ajoutees depuis stage.fr.`,
  }
})
