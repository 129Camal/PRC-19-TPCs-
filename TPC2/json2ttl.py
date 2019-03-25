import json, sys
winners = {}
idNobel = 1

with open('nobel.json', 'r') as f:
    nobelprizes = json.load(f)

f = open('out.txt', 'w')
sys.stdout = f

for nobel in nobelprizes:
    if not 'overallMotivation' in nobel:
                nobel['overallMotivation'] = "\"\""

    print(":nobel"+ str(idNobel) + " rdf:type owl:NamedIndividual, :Nobel ;", 
            "\t:category \""+ nobel['category'] + "\" ;",
            "\t:overallMotivation "+ nobel['overallMotivation'] + " ;",
            "\t:year "+ nobel['year'] + " .\n",
            sep="\n")
    
    for winner in nobel['laureates']:
        print(":nobel"+ str(idNobel) + " :hasWinner :person" + winner['id'] +  " .\n")
        if(not(winners.get(winner['id']))):
            if not 'motivation' in winner:
                winner['motivation'] = "\"\""

            winners[winner['id']] = winner

            print(":person"+ winner['id'] + " rdf:type owl:NamedIndividual, :Person ;", 
                  "\t:firstname \""+ winner['firstname'] + "\" ;",
                  "\t:motivation "+ winner['motivation'] + " ;",
                  "\t:share "+ winner['share'] + " ;",
                  "\t:surname \""+ winner['surname'] + "\" .\n",
                  sep="\n")
            
    idNobel += 1