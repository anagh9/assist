import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ViewResearch = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [text, setText] = useState(
    `The search results provide valuable insights into the environmental impact of lithium mining in South America. One
    relevant source is a report from The Nature Conservancy, which offers an overview of the potential environmental impacts
    associated with different extraction methods
    [https://efiling.energy.ca.gov/GetDocument.aspx?tn=245607&DocumentContentId=79638]. Another source is a transcript from
    a meeting held by the California Energy Commission, which discusses the environmental impacts of extracting and
    processing lithium [https://efiling.energy.ca.gov/getdocument.aspx?tn=239800]. Additionally, the Lawrence Berkeley
    National Laboratory comments highlight the potential environmental impact of lithium mining and processing
    [https://efiling.energy.ca.gov/GetDocument.aspx?tn=240198&DocumentContentId=73655]. Another transcript from a meeting by
    the California Energy Commission discusses the environmental impact of extracting lithium from geothermal brine
    [https://efiling.energy.ca.gov/getdocument.aspx?tn=240014].
    
    
    
    Brazil, with its largest consumer market and GDP in South America, remains an excellent market for experienced U.S.
    exporters [https://www.trade.gov/knowledge-product/brazil-market-overview] However, doing business in Brazil can be
    challenging due to its complicated regulatory environment
    [https://www.trade.gov/country-commercial-guides/brazil-trade-barriers] Chile, on the other hand, continues to be a
    strong trading partner for U.S. companies, thanks to its open market policies and zero tariffs
    [https://www.trade.gov/knowledge-product/exporting-chile-market-overview] Peru's focus on sound fiscal management and
    macroeconomic fundamentals has contributed to its leading position in the region
    [https://www.trade.gov/knowledge-product/exporting-peru-market-overview] It is important to note that Brazil ranks 108
    out of 190 countries for ease of trading across borders, indicating logistical costs and delays
    [https://www.trade.gov/country-commercial-guides/brazil-market-challenges] Brazil also possesses a mature policy and
    regulatory environment for the telecom sector, with the National Telecommunications Agency (ANATEL) playing a key role
    [https://www.trade.gov/country-commercial-guides/brazil-ict-information-and-communications-technologies-and] Colombia is
    another country in South America that offers opportunities for trade, with discussions on key economic indicators and
    trade statistics [https://www.trade.gov/knowledge-product/exporting-colombia-market-overview] The Cyber Mission South
    America provides a platform for policy and regulatory framework discussions with foreign government representatives
    [https://www.trade.gov/cyber-mission-south-america] It is important to stay updated on the standards for trade in
    Brazil, including national standards, accreditation bodies, and testing organizations
    [https://www.trade.gov/country-commercial-guides/brazil-standards-trade]
    
    
    
    Chile is known for its open market policies, zero tariffs, solid business practices, and low corruption index, making it
    an attractive trading partner for U.S. companies. The country has a history of economic and political stability,
    transparency, and strong democratic institutions. Chile has also been praised for its successful efforts in mitigating
    the spread of COVID-19 through mobility restrictions and a widespread vaccination campaign.
    
    The Chilean government has proposed broad tax reforms to expand the role of the government in the economy and provide
    expansive social services. This has raised concerns among investors and the business community. Pending legislation
    could bring significant changes to business rules and regulations, particularly in industries such as mining, energy,
    water, healthcare, and financial services.
    
    Economic shocks, such as the lingering effects of the COVID-19 pandemic and energy and overall price increases resulting
    from Russia's invasion of Ukraine, have impacted the Chilean economy and led to inflation. These factors have the
    potential to affect trade in Chile, creating uncertainties and challenges for businesses operating in the country.
    
    Bilateral trade between the United States and Chile has been strong, with the United States exporting mineral fuels and
    machinery in exchange for Chile's copper and agricultural products. Chile continues to pursue market-oriented
    strategies, expand global commercial ties, and actively participate in international issues and free trade agreements.
    It is a member of various regional and international organizations, including the Pacific Alliance, Mercosur, APEC, and
    the OECD.
    
    In conclusion, Chile remains an important and favorable trading partner for the United States. The political and
    regulatory factors affecting trade in Chile are influenced by the country's open market policies, tax reforms, pending
    legislation, economic shocks, and its commitment to market-oriented strategies and international trade agreements.
    
    [https://www.trade.gov/knowledge-product/exporting-chile-market-overview]
    
    
    
    President Gabriel Boric and his team have proposed broad tax reforms to finance additional social programs, which could
    bring significant changes to business rules and regulations in industries such as mining, energy, water, healthcare, and
    financial services. Inflation rates have risen, with consumer prices increasing by nearly 12.5% and the Chilean peso
    experiencing sharp devaluation. The Central Bank has responded by raising interest rates to 9.75%, a historic high.
    Economic growth for 2022 is forecasted to be modest at 1-2%, with either no growth or a slight contraction expected for
    2023. The volatility in the price of copper, a key export for Chile, has also impacted the economy.
    
    [https://www.trade.gov/knowledge-product/exporting-chile-market-overview]`
  );
  const textContainerRef = useRef(null);
  const navigate = useNavigate();
  const scrollSpeed = 50; // Adjust the scroll speed here (in milliseconds)

  useEffect(() => {
    const scrollText = () => {
      if (textContainerRef.current) {
        textContainerRef.current.scrollLeft += 1;
        if (textContainerRef.current.scrollLeft < textContainerRef.current.scrollWidth) {
          setTimeout(scrollText, scrollSpeed);
        } else {
          textContainerRef.current.scrollLeft = 0;
          setTimeout(scrollText, scrollSpeed);
        }
      }
    };

    if (isPlaying) {
      scrollText();
    }

    return () => {
      clearTimeout(scrollText);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleScrollLeft = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex justify-between w-full max-w-4xl mt-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={handleScrollLeft}
        >
          <FaChevronLeft />
        </button>
      </div>
      <div
        className="w-full max-w-4xl border border-gray-300 p-4 mb-4 overflow-x-auto"
        style={{ maxHeight: '700px' }} // Adjust the max height as needed
      >
        <p ref={textContainerRef} className="whitespace-pre-line text-lg">
          {text}
        </p>
      </div>
      <div className="flex justify-between w-full max-w-4xl">
        <button
          className={`${
            isPlaying ? 'bg-gray-200 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
          } text-white font-bold py-2 px-4 rounded flex items-center`}
          onClick={handlePlay}
          disabled={isPlaying}
        >
          <FaPlay className="mr-2" />
          Play
        </button>
        <button
          className={`${
            !isPlaying ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded flex items-center`}
          onClick={handlePause}
          disabled={!isPlaying}
        >
          <FaPause className="mr-2" />
          Pause
        </button>
      </div>
    </div>
  );
};

export default ViewResearch;


