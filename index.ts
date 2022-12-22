// import modules
import { Client } from "@notionhq/client"
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'

// import static files
import CONFIG from './config.json'

const NOTION_KEY:string = CONFIG.notion.integrationKey
const NOTION_DATABASE_ID:string = CONFIG.notion.databaseId

console.log(NOTION_KEY)
console.log(NOTION_DATABASE_ID)

const notion:Client = new Client({ auth: NOTION_KEY })

async function addItem(text: string = '', check: boolean = false, result: string = '', tags: string[] = []) {
    try {
        const response:CreatePageResponse = await notion.pages.create({
            parent: { database_id: NOTION_DATABASE_ID },
            properties: {
                '이름': {
                    type: 'title',
                    title: [{
                        type: 'text',
                        text: {
                            content: text
                        }
                    }]
                },
                'Check': {
                    type: 'checkbox',
                    checkbox: check
                },
                'Result': { 
                    type: 'rich_text',
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: result
                            }
                        }
                    ]
                },
                '태그': {
                    type: 'multi_select',
                    multi_select: tags.map(tag => {
                        return {
                            name: tag
                        }
                    })
                }
            },
        })
        console.log(response)
        console.log("Success! Entry added.")
    } catch (error) {
        console.error(error.body)
    }
}

addItem("Test Name", false, "Test Result", ["Test Tag 1", "Test Tag 2"])