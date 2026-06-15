  <JWT-authenticiation and bycypt hashing:>
  [HOW-PASSWORD-IS-PASSING:],
  plain password  →  bcrypt(password + salt)  →  hash stored in DB

What is Salt?
Salt is a random string generated fresh for every password hash. bcrypt automatically generates and embeds the salt inside the hash itself.

bycrypt hashing:=>
Salt is already added
So the stored hash already contains the salt — you don't need a separate column for it.