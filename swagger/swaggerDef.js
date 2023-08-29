const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Music Metadata API',
      version: '1.0.0',
    },
    paths: {
        '/tracks': {
          post: {
            summary: 'Create a new track',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      ISRC: {
                        type: 'string',
                        description: 'The ISRC of the track'
                      }
                    }
                  }
                }
              }
            },
            responses: {
              '201': {
                description: 'Track created successfully',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Track'
                    }
                  }
                }
              },
              '400': {
                description: 'Bad request'
              },
              '500': {
                description: 'Internal server error'
              }
            }
          }
        },
        '/tracks/{isrc}': {
          get: {
            summary: 'Get a track by ISRC',
            parameters: [
              {
                name: 'isrc',
                in: 'path',
                required: true,
                schema: {
                  type: 'string'
                },
                description: 'The ISRC of the track to retrieve'
              }
            ],
            responses: {
              '200': {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Track'
                    }
                  }
                }
              },
              '404': {
                description: 'Track not found'
              },
              '500': {
                description: 'Internal server error'
              }
            }
          }
        },
        '/tracks/artist/{artistName}': {
          get: {
            summary: 'Get tracks by artist',
            parameters: [
              {
                name: 'artistName',
                in: 'path',
                required: true,
                schema: {
                  type: 'string'
                },
                description: 'The name of the artist to search for'
              }
            ],
            responses: {
              '200': {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Track'
                      }
                    }
                  }
                }
              },
              '404': {
                description: 'No tracks found for the artist'
              },
              '500': {
                description: 'Internal server error'
              }
            }
          }
        }
      },
      components: {
        schemas: {
          Track: {
            type: 'object',
            properties: {
              isrc: {
                type: 'string',
                description: 'The ISRC of the track'
              },
              title: {
                type: 'string',
                description: 'The title of the track'
              },
              artist: {
                type: 'string',
                description: 'List of artist names'
              },
              imageURI: {
                type: 'string',
                description: "The URI of the track's image"
              }
            }
          }
        }
      }
  },
  apis: ['../routes/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = { specs, swaggerUi };
