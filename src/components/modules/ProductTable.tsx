import React from 'react'
import { Card, CardContent } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

type ProductTableProps = {
  data: any
}

const ProductTable = ({ data }: ProductTableProps) => {
  if (!data || !data.length) return null;

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.map((product: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price_range.max}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ProductTable