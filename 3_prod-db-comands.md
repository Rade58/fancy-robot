USE THESE COMANDS IF YOU WANT TO ENTER redis-cli O psql OF YOUR
PRODUCTION DATBASES

1. REDIS ON UPSTASH:
COMMAND PROVIDED IN DASHBOARD, IT IS IN THIS FORMAT

`$ redis-cli -u <provided uri>`

ps.
  WE HAD TO INSTALL REDIS LOCALY (WE DID THAT AND DISABLED IT LATER (WITH systemctl))

2.POSTGRES ON SUPABASE

IMPORTANT THING: PASSWORD YOU GOT WHEN YOU
CREATED SUPABASE PROJECT

GO TO DAASBOARD AND THEN TO YOUR PROJECT
AFTER THAT TO `Settings`(left) --> `Database` -->
YOU WILL SE URL LIKE THIS

`$ psql postgresql://postgres:<YOUR-PASSWORD>@db.<blahblahblah>.supabase.co:5432/postgres`

ABOVE URL IS THE SMAE WE SET INTO .env.production.local

YOU KNOW WHAT TO DO

ps.
  TO ENTER psql YOU NEED TO INSTALL IT ON YOUR local
  COMPUTER

  I THINK IT CAN BE INSTALLED WITH `sudo apt-get install -y postgresql-client`
I DID THIS AND I WAS ABLE TO CONNECT, BUT MAYBE THERE ARE BETTER SOLUTIONS
BECAUSE I DID INSTALL CLIENT VERSION 12 WITH THIS, BUT
VERSIN ON THE SERVER WAS 13