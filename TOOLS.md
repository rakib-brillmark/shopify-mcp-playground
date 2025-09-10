# Tools

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "tools": [
            {
                "name": "search_shop_catalog",
                "description": "Search for products from the online store, hosted on Shopify.\n\nThis tool can be used to search for products using natural language queries, specific filter criteria, or both.\n\nBest practices:\n- Searches return available_filters which can be used for refined follow-up searches\n- When filtering, use ONLY the filters from available_filters in follow-up searches\n- For specific filter searches (category, variant option, product type, etc.), use simple terms without the filter name (e.g., \"red\" not \"red color\")\n- For filter-specific searches (e.g., \"find burton in snowboards\" or \"show me all available products in gray / green color\"), use a two-step approach:\n  1. Perform a normal search to discover available filters\n  2. If relevant filters are returned, do a second search using the proper filter (productType, category, variantOption, etc.) with just the specific search term\n- Results are paginated, with initial results limited to improve experience\n- Use the after parameter with endCursor to fetch additional pages when users request more results\n\nThe response includes product details, available variants, filter options, and pagination info.\n",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "A natural language query."
                        },
                        "filters": {
                            "type": "array",
                            "description": "Filters to apply to the search. Only apply filters from the available_filters returned in a previous response.",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "available": {
                                        "type": "boolean",
                                        "description": "Filter on if the product is available for sale",
                                        "default": true
                                    },
                                    "category": {
                                        "type": "object",
                                        "description": "Category ID to filter by",
                                        "properties": {
                                            "id": {
                                                "type": "string",
                                                "description": "Category ID to filter by"
                                            }
                                        }
                                    },
                                    "price": {
                                        "type": "object",
                                        "description": "Price range to filter by",
                                        "properties": {
                                            "min": {
                                                "type": "number",
                                                "description": "Minimum price to filter by, represented as a float, e.g. 50.0"
                                            },
                                            "max": {
                                                "type": "number",
                                                "description": "Maximum price to filter by, represented as a float, e.g. 100.0"
                                            }
                                        }
                                    },
                                    "productMetafield": {
                                        "type": "object",
                                        "description": "Filter on a product metafield",
                                        "properties": {
                                            "key": {
                                                "type": "string",
                                                "description": "The key of the metafield to filter by"
                                            },
                                            "namespace": {
                                                "type": "string",
                                                "description": "The namespace of the metafield to filter by"
                                            },
                                            "value": {
                                                "type": "string",
                                                "description": "The value of the metafield to filter by"
                                            }
                                        }
                                    },
                                    "productType": {
                                        "type": "string",
                                        "description": "Product type to filter by"
                                    },
                                    "productVendor": {
                                        "type": "string",
                                        "description": "Product vendor to filter by"
                                    },
                                    "tag": {
                                        "type": "string",
                                        "description": "Tag to filter by"
                                    },
                                    "taxonomyMetafield": {
                                        "type": "object",
                                        "description": "Taxonomy metafield to filter by",
                                        "properties": {
                                            "key": {
                                                "type": "string"
                                            },
                                            "namespace": {
                                                "type": "string"
                                            },
                                            "value": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "variantMetafield": {
                                        "type": "object",
                                        "description": "Variant metafield to filter by",
                                        "properties": {
                                            "key": {
                                                "type": "string",
                                                "description": "The key of the metafield to filter by"
                                            },
                                            "namespace": {
                                                "type": "string",
                                                "description": "The namespace of the metafield to filter by"
                                            },
                                            "value": {
                                                "type": "string",
                                                "description": "The value of the metafield to filter by"
                                            }
                                        }
                                    },
                                    "variantOption": {
                                        "type": "object",
                                        "description": "Variant option to filter by",
                                        "properties": {
                                            "name": {
                                                "type": "string",
                                                "description": "Name of the variant option to filter by"
                                            },
                                            "value": {
                                                "type": "string",
                                                "description": "Value of the variant option to filter by"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "country": {
                            "type": "string",
                            "description": "ISO 3166-1 alpha-2 country code for which to return localized results (e.g., 'US', 'CA', 'GB')."
                        },
                        "language": {
                            "type": "string",
                            "description": "ISO 639-1 language code for which to return localized results (e.g., 'EN', 'FR', 'DE')."
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Maximum number of products to return. Defaults to 10, maximum is 250. For better user experience, use the default of 10 and ask the user if they want to see more results.",
                            "default": 10
                        },
                        "after": {
                            "type": "string",
                            "description": "Pagination cursor to fetch the next page of results. Use the endCursor from the previous response. Only use this when the user explicitly asks to see more results."
                        },
                        "context": {
                            "type": "string",
                            "description": "Additional information about the request such as user demographics, mood, location, or other relevant details that could help in tailoring the response appropriately."
                        }
                    },
                    "required": [
                        "query",
                        "context"
                    ]
                }
            },
            {
                "name": "get_cart",
                "description": "Get the cart including items, shipping options, discount info, and checkout url for a given cart id",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "cart_id": {
                            "type": "string",
                            "description": "Shopify cart id, formatted like: gid://shopify/Cart/c1-66330c6d752c2b242bb8487474949791?key=fa8913e951098d30d68033cf6b7b50f3"
                        }
                    },
                    "required": [
                        "cart_id"
                    ]
                }
            },
            {
                "name": "update_cart",
                "description": "Perform updates to a cart, including adding/removing/updating line items, buyer information, shipping details, discount codes, gift cards and notes in one consolidated call. Shipping options become available after adding items and delivery address. When creating a new cart, only addItems is required.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "cart_id": {
                            "type": "string",
                            "description": "Identifier for the cart being updated. If not provided, a new cart will be created."
                        },
                        "add_items": {
                            "type": "array",
                            "description": "Items to add to the cart. Required when creating a new cart.",
                            "required": [
                                "items"
                            ],
                            "items": {
                                "type": "object",
                                "required": [
                                    "product_variant_id",
                                    "quantity"
                                ],
                                "properties": {
                                    "product_variant_id": {
                                        "type": "string"
                                    },
                                    "quantity": {
                                        "type": "integer",
                                        "minimum": 1
                                    }
                                }
                            }
                        },
                        "update_items": {
                            "type": "array",
                            "description": "Existing cart line items to update quantities for. Use quantity 0 to remove an item.",
                            "required": [
                                "items"
                            ],
                            "items": {
                                "type": "object",
                                "required": [
                                    "id",
                                    "quantity"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "string"
                                    },
                                    "quantity": {
                                        "type": "integer",
                                        "minimum": 0
                                    }
                                }
                            }
                        },
                        "remove_line_ids": {
                            "type": "array",
                            "required": [
                                "items"
                            ],
                            "description": "List of line item IDs to remove explicitly.",
                            "items": {
                                "type": "string"
                            }
                        },
                        "buyer_identity": {
                            "type": "object",
                            "description": "Information about the buyer including email, phone, and delivery address.",
                            "additional_properties": false,
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "format": "email"
                                },
                                "phone": {
                                    "type": "string"
                                },
                                "country_code": {
                                    "type": "string",
                                    "description": "ISO country code, used for regional pricing."
                                }
                            }
                        },
                        "delivery_addresses_to_add": {
                            "type": "array",
                            "description": "Information about the delivery addresses to add.",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "selected": {
                                        "type": "boolean",
                                        "description": "Optional - should this address be selected for delivery (first address defaults true)."
                                    },
                                    "delivery_address": {
                                        "type": "object",
                                        "properties": {
                                            "first_name": {
                                                "type": "string"
                                            },
                                            "last_name": {
                                                "type": "string"
                                            },
                                            "phone": {
                                                "type": "string"
                                            },
                                            "address1": {
                                                "type": "string"
                                            },
                                            "address2": {
                                                "type": "string"
                                            },
                                            "city": {
                                                "type": "string"
                                            },
                                            "province_code": {
                                                "type": "string"
                                            },
                                            "zip": {
                                                "type": "string"
                                            },
                                            "country_code": {
                                                "type": "string",
                                                "description": "ISO country code, used for regional pricing."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "delivery_addresses_to_replace": {
                            "type": "array",
                            "description": "Delivery addresses to apply to the cart, replaces all existing cart delivery addresses.",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "selected": {
                                        "type": "boolean",
                                        "description": "Optional - should this address be selected for delivery (first address defaults true)."
                                    },
                                    "delivery_address": {
                                        "type": "object",
                                        "properties": {
                                            "first_name": {
                                                "type": "string"
                                            },
                                            "last_name": {
                                                "type": "string"
                                            },
                                            "phone": {
                                                "type": "string"
                                            },
                                            "address1": {
                                                "type": "string"
                                            },
                                            "address2": {
                                                "type": "string"
                                            },
                                            "city": {
                                                "type": "string"
                                            },
                                            "province_code": {
                                                "type": "string"
                                            },
                                            "zip": {
                                                "type": "string"
                                            },
                                            "country_code": {
                                                "type": "string",
                                                "description": "ISO country code, used for regional pricing."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "selected_delivery_options": {
                            "type": "array",
                            "description": "The delivery options to select for the cart.",
                            "items": {
                                "type": "object",
                                "required": [
                                    "group_id",
                                    "option_handle"
                                ],
                                "properties": {
                                    "group_id": {
                                        "type": "string",
                                        "description": "The ID of the delivery group to select."
                                    },
                                    "option_handle": {
                                        "type": "string",
                                        "description": "The handle of the delivery option to select."
                                    }
                                }
                            }
                        },
                        "discount_codes": {
                            "type": "array",
                            "description": "Discount or promo codes to apply to the cart. Only prompt if customer mentions having a discount code.",
                            "items": {
                                "type": "string"
                            }
                        },
                        "gift_card_codes": {
                            "type": "array",
                            "description": "Gift card codes to apply to the cart. Only prompt if customer mentions having a gift card.",
                            "items": {
                                "type": "string"
                            }
                        },
                        "note": {
                            "type": "string",
                            "description": "A note or special instructions for the cart. Optional - can ask if customer wants to add special instructions."
                        }
                    }
                }
            },
            {
                "name": "search_shop_policies_and_faqs",
                "description": "Used to get facts about the stores policies, products, or services.\nSome examples of questions you can ask are:\n  - What is your return policy?\n  - What is your shipping policy?\n  - What is your phone number?\n  - What are your hours of operation?\"\n",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "A natural language query."
                        },
                        "context": {
                            "type": "string",
                            "description": "Additional information about the request such as user demographics, mood, location, or other relevant details that could help in tailoring the response appropriately."
                        }
                    },
                    "required": [
                        "query"
                    ]
                }
            },
            {
                "name": "get_product_details",
                "description": "Look up a product by ID and optionally specify variant options to select a specific variant.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "product_id": {
                            "type": "string",
                            "description": "The product ID, e.g. gid://shopify/Product/123"
                        },
                        "options": {
                            "type": "object",
                            "description": "Optional variant options to select a specific variant, e.g. {\"Size\": \"10\", \"Color\": \"Black\"}"
                        }
                    },
                    "required": [
                        "product_id"
                    ]
                }
            }
        ]
    }
}
```