# Generating JSON Data

[JSON Generator](https://next.json-generator.com)

```json
{
  "locations": [
    {
      'repeat(100)': {
        id: '{{index()}}',
        name: '{{company()}}',
        address: '{{integer(100, 999)}} {{street()}}, Baton Rouge, LA, {{integer(70000, 70999)}}',
        phone: '+1 {{phone()}}',
        latitude: '{{floating(30.500001, 30.700001)}}',
        longitude: '{{floating(-90.500001, -91.50001)}}'
      }
    }
  ],
  "products": [
    {
      'repeat(100)': {
        id: '{{index()}}',
        name: '{{company()}}',
        description: '{{lorem(1, "paragraphs")}}',
        type: '{{random("one", "two", "three")}}',
        locations: [
          {
            'repeat(10,30)': function(tags, parent) {
              const index = tags.integer(0, parent.locations.length - 1);
              return parent.locations[index];
            }
          }
        ]
      }
    }
  ]
}
```