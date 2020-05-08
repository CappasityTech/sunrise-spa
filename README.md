# How to integrate Cappasity with commercetools 

## About Cappasity 
[Cappasity](https://www.cappasity.com/) is the first complete SaaS solution for fast production and easy embedding of 3D content into websites, mobile apps, AR & VR, and digital signage. It takes only 3 minutes to create a 3D View and embed it into an online store. Our users see higher conversion rates (10-30% increase), higher dwell time on the product page, fewer returns and customer fewer inquiries.   

The Cappasity integration for commercetools adds interactive 3D images to product pages with matching SKU IDs. Each 3D View will appear in the image gallery, letting your online customers see the item from all sides and zoom in on the details. 
Demo - https://sunrise-cappasity.netlify.app/en/product/bag/user-uniq-sku
 
## Prerequisites
1. Create products in your online store  
Each product you want to integrate has its own inner ID in the online store and one or more corresponding SKU codes. Sometimes a product also has variants with their own IDs and SKU numbers.
2. Set up a Cappasity account 
Sign up at [3d.cappasity.com](https://3d.cappasity.com/register) to create your Cappasity account. Visit our website [cappasity.com](https://cappasity.com/) to download the Easy 3D Scan software, read the instructions and create a 3D View yourself or find a Cappasity [certified photo partner](https://cappasity.com/photography-finder/) who will do this for you. 
3. Create Cappasity 3D Views  
Using the Easy 3D Scan, create and upload 3D Views to your Cappasity account. Fill in the corresponding SKU IDs for the 3D Views that you want to synchronize. Each resulting model has its inner Cappasity View ID. You need these IDs to generate an iFrame code for the player.
 
## Integration into commercetools
To quickly integrate Cappasity 3D Views into your product pages, an extra GET request must be sent to the Cappasity API on the client side. Refer to this [code](https://github.com/CappasityTech/sunrise-spa/commit/56b12a510b6a1dabc5488d44eb80168f49bdfdb3) to see an example of such an integration.  
To implement the integration, complete the following steps:  
1. After rendering the product page, send a GET request to the Cappasity API with the product SKU ID and your Cappasity username.   
2. Then, if the product exists on the Cappasity platform, you will receive JSON data with the product info.  
3. Add the following new HTML elements to the page:  
- iframe (string html from response)
- `` <script async src=”https://api.cappasity.com/api/player/cappasity-ai” /> ``
- A button for switching between Cappasity 3D View and your product images. [Here](https://www.dropbox.com/s/eofrt5m9rlvx09o/Cappasity_3DIcons.zip?dl=0) you may find the standard 3D button. 
- If the SKU ID wasn’t found on your Cappasity account, you will receive a 404 error.

Alternatively, you can use our [PHP SDK](https://github.com/CappasityTech/Cappasity-PHP-SDK) for even more convenient integration, or order a turnkey solution for your online store by Cappasity. Contact us for more details at [info@cappasity.com](mailto:info@cappasity.com).

## Support 
If you have any questions, please send your inquiries to [support@cappasity.com](mailto:support@cappasity.com).
###### &copy; Copyright 2020 Cappasity Inc. All rights reserved.
