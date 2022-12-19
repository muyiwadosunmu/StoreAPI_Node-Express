const express = require('express');
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    const { featured, company , name, sort, fields, numericFilters} = req.query;
    const queryObject = {} 

    if (featured) {
        queryObject.featured = featured === 'true'? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = { $regex:name, $options: 'i'} //i in options is for insensitivity
    }
    if (numericFilters) {
        // We made this block quite easy by using user friendly ones,which are mapped to actual ones
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx, (match) => `-${operatorMap[match]}-`)
        console.log(filters)
    
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item) => {
            const [field,operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)}
            }
        })
    }
     console.log(queryObject);
    let result = Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
        console.log(sort)
        // products = result.sort()
    }
    else {
        result = result.sort('createdAt')
    }
    // fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit;

    result = result.skip(skip).limit(limit)
    const products = await result
    console.log(products)
    res.status(200).json({products, nbHits:products.length})
}

const getAllProductStatic = async (req, res) => {
    // This method follows a static way of querying the DB
    const products = await Product.find({
        // name:'albany'
        // name: {$regex:search, $options:'i'}

    }).select('name price')
    // .sort('-name price') // sorts name from the back, then sorts price in order of increase
    res.status(200).json({ products, nbHits:products.length });
}



module.exports = {getAllProducts, getAllProductStatic};