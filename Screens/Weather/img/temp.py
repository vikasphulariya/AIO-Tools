a=0
b=range(1 , 101)
for number in b:
    if (number % 3==0 and number % 5==0):
        print(number,'FIZZBUZZ') 
    elif number % 3==0:
        print(number,'FIZZ')
        
    elif number % 5==0:
        print(number,'BUZZ')
       
    else:
        print(number)