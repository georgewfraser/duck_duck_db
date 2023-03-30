import streamlit
import duckdb

duckdb.sql("select * from 'ducks.json'").show()

name = streamlit.selectbox("Ducks", duckdb.sql("select name from 'ducks.json'").to_df())

[imageSrc, link, facts] = duckdb.sql("select imageSrc, link, facts from 'ducks.json' where name = '{name}'".format(name=name)).to_df().iloc[0].values

streamlit.image(imageSrc)

for fact in facts:
    streamlit.markdown("**{key}**: {value}".format(key=fact[0], value=fact[1]))

streamlit.markdown("[Learn more]({link})".format(link=link))