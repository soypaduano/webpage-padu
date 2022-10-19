

const adData = {
    facebook: {
        site: 'Facebook',
        adViews: 23400,
        clicks: 210,
        conversions: 5,
    },
    twitter: {
        site: 'Twitter',
        adViews: 23400,
        clicks: 192,
        conversions: 9,
    },
    instagram: {
        site: 'Instagram',
        adViews: 23400,
        clicks: 200,
        conversions: 2,
    }
}

class AdvertisingChannel{
    constructor(adData){
        Object.assign(this, adData)
        this.conversionRate = ((this.conversions / this.clicks) * 100).toFixed(2);
    }

    getAdvertisingChannelHtml = () => `<div class="site-name"> ${this.site} </div>
    <div>Views: ${this.adViews} </div>
    <div>Clicks: ${this.clicks} </div>
    <div>Conversions: ${this.conversions} </div>
    <div>Conv. Rate: <span class="highlight"> ${this.conversionRate} %</span></div>`
}


let fb = new AdvertisingChannel(adData['facebook']);
let twitter = new AdvertisingChannel(adData['twitter']);
let instagram = new AdvertisingChannel(adData['instagram']);

$('#fb').html(fb.getAdvertisingChannelHtml())
$('#twit').html(twitter.getAdvertisingChannelHtml());
$('#insta').html(instagram.getAdvertisingChannelHtml());

