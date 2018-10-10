# Generating JSON Data

[JSON Generator](https://next.json-generator.com)

```json
{
  "products": [
    {
      'repeat(100)': {
        id: '{{index()}}',
        name: '{{company()}}',
        description: '{{lorem(1, "paragraphs")}}',
        type: '{{random("one", "two", "three")}}',
        locations: [
          {
            'repeat(5, 10)': {
              id: '{{index()}}',
              name: '{{company()}}',
              address: '{{integer(100, 999)}} {{street()}}, Baton Rouge, LA, {{integer(70000, 70999)}}',
              phone: '+1 {{phone()}}',
              latitude: '{{floating(-90.000001, -91.999999)}}',
              longitude: '{{floating(30.000001, 30.999999)}}'
            }
          }
        ]
      }
    }
  ]
}
```