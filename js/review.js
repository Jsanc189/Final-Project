$(document).ready(function(){
    var words = 
    {
        origin:{
            "rating": ["5 OUT OF 5 STARS!  #positive_event#.", 
                      "4 out of 5 stars.  #positive_event#.", 
                      "3 out of 5 stars.  #neutral_event#.",
                      "2 out of 5 stars.  #neutral_event#", 
                      "1 out of 5 stars.  #negative_event#.", 
                      "0 OUT OF 5 STARS!  #negative_event#" 
                     ],
            "positive_event": ["Enjoy a cozy Italian restaurant ambiance. #food# was topped with fresh #topping1#.  What a delight!",
                               "Picture a bustling pizzeria where skilled chefs craft pizzas in a roaring wood fired oven. The #food# was just premium!",
                               "Step into a trendy pizzeria with colorful, stunning pizzas!  Each bite of #food# tastes handcrafted with care and devotion.  Loved the fresh #topping1#!",
                               "Experience the classic taste of Naples with this #food# topped with #topping1# and #topping2#.  It's a taste of tradition, simple yet sublime.",
                               "From farm to table!  This place sources all its #topping1# and #topping2# from local farms.  Its a taste of the countrside with the #food#!" 
                            ],
            "neutral_event":  ["Nothing to special. The famed #topping1# was not up to the hype others built.",
                              "The #food# was kinda mid, nothing impressive",
                              "The #food# wasn't bad, but I've had better at different pizzaera",
                              "The #food# was good, but I think the price was a bit too high than what it's worth",
                              "A not too expensive place to get a #food# if you don't want to pay too much for one. Kinda stale, but not bad to where you'll regret buying it"
                            ],
            "negative_event": ["Taking a bite of what appears to be a normal #food#, you're met with the unexpected texture of #topping1#. The shock was too much!",
                               "THIS PLACE IS THE WORST!  BURNDE MY ORDER! RUD CUSTOMER SERVICE! WILL NOT BE COMING BACK!!!!",
                               "After indulging in what seemed like a casual pizza dinner at a local joint, you wake up in the middle of the night with food poisoing!  NEVER COMING BACK!",
                               "Soggy #food#.  The #topping1# was not fresh.  Won't be coming back....",
                               "Sad, limp crust on #food#.   It felt like it was frozen for a month before they microwaved and served it to me.  Gross."
                            ],
            "food":["Pepporoni Pizza"],
            "topping1":["pepporoni"],
            "topping2":["mozzarella"]
        }
    }

    //Gourmet Delight: Enjoy a cozy Italian restaurant ambiance with a thin, crispy crust pizza topped with fresh basil, 
    //cherry tomatoes, and creamy mozzarella. Every bite bursts with flavor, leaving you feeling indulged.

    function loadGrammar(){
        var grammar = tracery.createGrammar(words["origin"]);
        //$('#output').html("<div>"+grammar.flatten('#rating#')+"</div>");
        var generatedText = grammar.flatten('#rating#');
        console.log("Generated Text:", generatedText);
        console.log("finished loading!");

    }

    loadGrammar();
});