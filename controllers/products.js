const express = require('express');
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    const { featured, company , name} = req.query;
    console.log(featured)
    const queryObject = {} 
    if (featured) {
        queryObject.featured = featured === 'true'? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = name
    }
    const products = await Product.find(queryObject)
    console.log(products)
    res.status(200).json({products, nbHits:products.length})
}

const getAllProductStatic = async (req, res) => {
    // This method follows a static way of querying the DB
    const products = await Product.find({
        name:'albany'
    })
    res.status(200).json({ products, nbHits:products.length });
}



module.exports = {getAllProducts, getAllProductStatic};