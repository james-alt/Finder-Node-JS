# Generating JSON Data

[JSON Generator](https://next.json-generator.com)

```json
{
  "locations": [
    {
      'repeat(20)': {
        id: '{{index()}}',
        name: '{{company()}}',
        address: '{{integer(100, 999)}} {{street()}}, Baton Rouge, LA, {{integer(70000, 70999)}}',
        phone: '+1 {{phone()}}',
        latitude: '{{floating(-90.000001, -91.999999)}}',
        longitude: '{{floating(30.000001, 30.999999)}}'
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
            'repeat(5,10)': function(tags, parent) {
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