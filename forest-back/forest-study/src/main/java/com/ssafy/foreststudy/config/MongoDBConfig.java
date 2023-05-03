//package com.ssafy.foreststudy.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.mongodb.MongoDatabaseFactory;
//import org.springframework.data.mongodb.core.convert.DbRefResolver;
//import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
//import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
//import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
//import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
//
//@Configuration
//public class MongoDBConfig {
//
//    @Bean
//    public MappingMongoConverter mappingMongoConverter(
//            MongoDatabaseFactory mongoDatabaseFactory,
//            MongoMappingContext mongoMappingContext
//    ) {
//        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDatabaseFactory);
//        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
//        converter.setTypeMapper(new DefaultMongoTypeMapper(null));
//        return converter;
//    }
//}