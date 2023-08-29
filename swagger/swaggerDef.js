const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'LTI Mindtree Music API',
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
                      isrc: {
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
              '409': {
                description: 'Track already exists'
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
              Artists: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      description: 'The ID of the artist'
                    },
                    name: {
                      type: 'string',
                      description: 'The name of the artist'
                    },
                    TrackIsrc: {
                      type: 'string',
                      description: 'The ISRC of the track associated with the artist'
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'The timestamp when the record was updated'
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'The timestamp when the record was created'
                    }
                  }
                },
                description: 'List of artists associated with the track'
              },
              spotifyImageURI: {
                type: 'string',
                format: 'uri',
                description: "The URI of the track's album's Spotify image"
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'The timestamp when the record was updated'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'The timestamp when the record was created'
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
