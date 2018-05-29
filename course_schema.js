{
    properties: {
        version : {
            required: true,
            type: 'number'
        },
            title: {
            required: true,
                    type: 'string'

            },
            subtitle: {
            required: true,
                    type: 'string'

            },
            mantainers: {
            required: true,
                    type: 'array'

            },
            contributors: {
            required: true,
            type: 'array'

            },
            url: {
            required: true,
            type: 'string'
            },
            description: {
            required: true,
            type: 'string'
            },
            usage: {
            required: true,
            type: 'string'
            },
            exercise_dir: {
            required: false,
            type: 'string'
            },
            exercise_prefix: {
            required: false,
            type: 'string'
            }
    }
}
